"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"

import { Form } from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { CustomField } from "./CustomField"
import { aspectRatioOptions, creditFee, transformationTypes } from "@/constants"
import { useState, useTransition } from "react"
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils"
import { updateCredits } from "@/lib/actions/user.actions"
import MediaUploader from "./MediaUploader"
import TransformedImage from "./TransformedImage"

export const formSchema = z.object({
  title: z.string().min(2).max(50),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string()
})


function TransformationFrom({ action, data = null, userId, type, creditBalance, config = null }: TransformationFormProps) {

    const transformationType = transformationTypes[type]
    const [image, setImage] = useState(data)
    const [newTransformation, setNewTransformation] = useState<Transformations | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isTransforming, setIsTransforming] = useState(false)
    const [transformationConfig, setTransformationConfig] = useState(config)
    const [isPending, startTransition] = useTransition()


    const initialValues = data && action === 'Update' ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId:data?.publicId
    } : {

    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
      }

      const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
        const imageSize = aspectRatioOptions[value as AspectRatioKey]

        setImage((prev: any) => (
            {
                ...prev,
                aspectRatio: imageSize.aspectRatio,
                width: imageSize.width,
                height: imageSize.height
            }
        ))

        setNewTransformation(transformationType.config)

        return onChangeField(value)
      }


      const onInputChangeHandler = (fieldName: string, value: string, type: string, onChangeField: (value: string) => void ) => {
        debounce(() => {
            setNewTransformation((prev: any) => ({
                ...prev,
                [type]: {
                    ...prev?.[type],
                    [fieldName === 'prompt' ? 'prompt' : 'to']: value
                }
            }))
        }, 1000)
      }


      const onTransformHandler = async () => {
        setIsTransforming(true)
        setTransformationConfig(deepMergeObjects(newTransformation, transformationConfig))

        setNewTransformation(null)

        startTransition(async () => {
            await updateCredits(userId, creditFee)
        })
      }

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CustomField
                control={form.control}
                name="title"
                formLabel="Título da imagem"
                className="w-full"
                render={({ field }) => <Input {...field} className="input-field" />}
            />

            {type === 'fill' && (
                <CustomField
                    control={form.control}
                    name="aspectRatio"
                    formLabel="Proporção"
                    className="w-full"
                    render={({ field }) => (
                        <Select
                            onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}>
                        <SelectTrigger className="select-field">
                            <SelectValue placeholder="Escolha a proporção" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(aspectRatioOptions).map((key) => (
                                <SelectItem key={key} value={key} className="select-item">
                                    {aspectRatioOptions[key as AspectRatioKey].label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    )}
                />
            )}

            {
                ((type === 'remove') || (type === 'recolor')) && (
                    <div className="prompt-field">
                        <CustomField
                            control={form.control}
                            name="prompt"
                            formLabel={
                                type === 'remove' ? 'Objeto a ser removido' : 'Objeto a ser recolorido'
                            }
                            className="w-full"
                            render={({ field }) =>
                            <Input
                                value={field.value}
                                className="input-field"
                                onChange={(e) => onInputChangeHandler('prompt', e.target.value, type, field.onChange)}
                            />}
                        />

                        {type === 'recolor' && (
                            <CustomField
                                control={form.control}
                                name="color"
                                formLabel="Nova cor"
                                className="w-full"
                                render={({ field }) =>
                                <Input
                                value={field.value}
                                className="input-field"
                                onChange={(e) => onInputChangeHandler('color', e.target.value, 'recolor', field.onChange)}
                                />
                            }
                            />
                        )}
                    </div>
                )
            }

            <div className="media-uploader-field">
                <CustomField
                    control={form.control}
                    name='publicId'
                    className="flex size-full flex-col"
                    render={({field}) => (
                        <MediaUploader
                            onValueChange={field.onChange}
                            setImage={setImage}
                            publicId={field.value}
                            image={image}
                            type={type}
                        />
                    )}

                />

                <TransformedImage
                    image={image}
                    type={type}
                    title={form.getValues('title')}
                    isTransforming={isTransforming}
                    setIsTransforming={setIsTransforming}
                    transformationConfig={transformationConfig}
                />
            </div>


            <div className="flex flex-col gap-4">
            <Button
                type="button"
                className="submit-button capitalize"
                disabled={isTransforming || newTransformation === null}
                onClick={onTransformHandler}>
                    {
                        isTransforming ? 'Transformando...' : 'Aplicar transformação'
                    }
            </Button>
            <Button
                type="submit"
                className="submit-button capitalize"
                disabled={isSubmitting}>
                    {isSubmitting ? 'Editando...' : 'Salvar imagem'}
            </Button>
            </div>


          </form>
        </Form>
      )
}

export default TransformationFrom
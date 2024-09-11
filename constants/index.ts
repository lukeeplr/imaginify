export const navLinks = [
    {
      label: "Início",
      route: "/",
      icon: "/assets/icons/home.svg",
    },
    {
      label: "Restaurar",
      route: "/transformations/add/restore",
      icon: "/assets/icons/image.svg",
    },
    {
      label: "Preencher",
      route: "/transformations/add/fill",
      icon: "/assets/icons/stars.svg",
    },
    {
      label: "Remover elementos",
      route: "/transformations/add/remove",
      icon: "/assets/icons/scan.svg",
    },
    {
      label: "Recolorir",
      route: "/transformations/add/recolor",
      icon: "/assets/icons/filter.svg",
    },
    {
      label: "Remover fundo",
      route: "/transformations/add/removeBackground",
      icon: "/assets/icons/camera.svg",
    },
    {
      label: "Perfil",
      route: "/profile",
      icon: "/assets/icons/profile.svg",
    },
    {
      label: "Comprar créditos",
      route: "/credits",
      icon: "/assets/icons/bag.svg",
    },
  ];


export const plans = [
    {
      _id: 1,
      name: "Grátis",
      icon: "/assets/icons/free-plan.svg",
      price: 0,
      credits: 10,
      inclusions: [
        {
          label: "10 créditos",
          isIncluded: true,
        },
        {
          label: "Acesso básico aos serviços",
          isIncluded: true,
        },
        {
          label: "Suporte prioritário",
          isIncluded: false,
        },
        {
          label: "Atualizações prioritárias",
          isIncluded: false,
        },
      ],
    },
    {
      _id: 2,
      name: "Pro",
      icon: "/assets/icons/free-plan.svg",
      price: 19.90,
      credits: 120,
      inclusions: [
        {
          label: "120 créditos",
          isIncluded: true,
        },
        {
          label: "Acesso completo a todos os serviços",
          isIncluded: true,
        },
        {
          label: "Suporte prioritário",
          isIncluded: true,
        },
        {
          label: "Atualizações prioritárias",
          isIncluded: false,
        },
      ],
    },
    {
      _id: 3,
      name: "Premium",
      icon: "/assets/icons/free-plan.svg",
      price: 99.90,
      credits: 2000,
      inclusions: [
        {
          label: "2000 créditos",
          isIncluded: true,
        },
        {
          label: "Acesso completo a todos os serviços",
          isIncluded: true,
        },
        {
          label: "Suporte prioritário",
          isIncluded: true,
        },
        {
          label: "Atualizações prioritárias",
          isIncluded: true,
        },
      ],
    },
  ];


export const aspectRatioOptions = {
    "1:1": {
      aspectRatio: "1:1",
      label: "Quadrado (1:1)",
      width: 1000,
      height: 1000,
    },
    "3:4": {
      aspectRatio: "3:4",
      label: "Retrato Padrão (3:4)",
      width: 1000,
      height: 1334,
    },
    "9:16": {
      aspectRatio: "9:16",
      label: "Retrato Celular (9:16)",
      width: 1000,
      height: 1778,
    },
  };


export const defaultValues = {
    title: "",
    aspectRatio: "",
    color: "",
    prompt: "",
    publicId: "",
  };


export const creditFee = -1;


export const transformationTypes = {
    restore: {
      type: "restore",
      title: "Restaurar imagem",
      subTitle: "Refine suas imagens removendo ruídos e imperfeições",
      config: { restore: true },
      icon: "image.svg",
    },
    removeBackground: {
      type: "removeBackground",
      title: "Remover fundo",
      subTitle: "Use Inteligência Artificial para remover o fundo da imagem",
      config: { removeBackground: true },
      icon: "camera.svg",
    },
    fill: {
      type: "fill",
      title: "Preencher imagem",
      subTitle: "Use Inteliência Artificial para alterar as dimensões de uma imagem e preencher o novo espaço",
      config: { fillBackground: true },
      icon: "stars.svg",
    },
    remove: {
      type: "remove",
      title: "Remover objetos",
      subTitle: "Identifique e remova objetos da imagem",
      config: {
        remove: { prompt: "", removeShadow: true, multiple: true },
      },
      icon: "scan.svg",
    },
    recolor: {
      type: "recolor",
      title: "Recolorir",
      subTitle: "Identifique e altera a cor de objetos na imagem",
      config: {
        recolor: { prompt: "", to: "", multiple: true },
      },
      icon: "filter.svg",
    },
  };
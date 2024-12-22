import json from "@/messages/en.json";

export function getItems(t, jsonPath) {
  const keys = jsonPath.split(".");
  const roleLength = keys.reduce((obj, key) => obj && obj[key], json)?.length;
  if (!roleLength) return null;
  const roleType = jsonPath.split(".").slice(1).join(".");
  return Array.from({ length: roleLength }, (_, i) => t(`${roleType}.${i}`));
}

export function getMetadata(locale) {
  if (locale === "ar") {
    return {
      title: {
        template: "ايميرج كبابليتيز للاستشارات الإدارية - %s",
        default:
          "ايميرج كبابليتيز للاستشارات الإدارية - تمكين الشركات السعودية من خلال حلول استشارية استراتيجية ومستدامة",
      },
      description:
        "شركة ايميرج كبابليتيز للاستشارات الإدارية هي شركة استشارية رائدة في المملكة العربية السعودية، مكرسة لتمكين الشركات من تحقيق النمو المستدام والنجاح في الأسواق المحلية والعالمية. بفضل خبرتنا في مجالات الاستراتيجية، والتحول الرقمي، وإدارة المخاطر",
      author: "Emerge Capabilities",
      keywords:
        "خدمات استشارية في السعودية, حلول استشارية استراتيجية, استشارات التحول الرقمي, الحوكمة وإدارة المخاطر (GRC), النمو المستدام للأعمال, التميز التنظيمي, أبحاث السوق في السعودية, الحوكمة البيئية والاجتماعية (ESG), خدمات إدارة التغيير, تطوير الاستراتيجيات المؤسسية, تخطيط استراتيجي, استراتيجيات استدامة الأعمال, حلول إدارة المخاطر, خدمات إدارة الأداء, استشارات الابتكار, دراسات الاقتصاد المحلي, الشراكات بين القطاعين العام والخاص",
      openGraph: {
        type: "website",
        url: "https://ecmc-ksa.com/",
        title:
          "ايميرج كبابليتيز للاستشارات الإدارية - تمكين الشركات السعودية من خلال حلول استشارية استراتيجية ومستدامة",
        description:
          "شركة ايميرج كبابليتيز للاستشارات الإدارية هي شركة استشارية رائدة في المملكة العربية السعودية، مكرسة لتمكين الشركات من تحقيق النمو المستدام. بفضل خبرتنا في مجالات الاستراتيجية، والتحول الرقمي، وإدارة المخاطر",
      },
      metadataBase: new URL("https://ecmc-ksa.com"),
    };
  }
  return {
    title: {
      template: "ECMC - %s",
      default:
        "ECMC - Empowering Saudi Businesses with Strategic Consulting Solutions",
    },
    description:
      "ECMC is a leading consulting company in Saudi Arabia, dedicated to empowering businesses for sustainable growth. With expertise in strategy, digital transformation, risk management.",
    author: "Emerge Capabilities",
    keywords:
      "Saudi Arabia consulting services, Strategic consulting solutions, Digital transformation consulting, Governance risk compliance (GRC), Sustainable business growth, Organizational excellence, Market research Saudi Arabia, Environmental Social Governance (ESG), Change management services, Corporate strategy development, Strategic planning consulting, Business continuity strategies, Risk management solutions, Performance management services, Innovation strategy consulting, Local economy studies consulting, Public-private sector strategies",
    openGraph: {
      type: "website",
      url: "https://ecmc-ksa.com/",
      title:
        "ECMC - Empowering Saudi Businesses with Strategic and Sustainable Consulting Solutions",
      description:
        "ECMC is a leading consulting company in Saudi Arabia, dedicated to empowering businesses for sustainable growth and success in local and global markets. With expertise in strategy, digital transformation, risk management.",
    },
    metadataBase: new URL("https://ecmc-ksa.com"),
  };
}

export function toCamelCase(str) {
  return str
    .toLowerCase()
    .split(/[\s-_]+/) // Split on spaces, hyphens, or underscores
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
}

import json from "@/messages/en.json";

export function getItems(t, jsonPath) {
  const keys = jsonPath.split(".");
  const roleLength = keys.reduce((obj, key) => obj && obj[key], json).length;
  const roleType = jsonPath.split(".").slice(1).join(".");
  return Array.from({ length: roleLength }, (_, i) => t(`${roleType}.${i}`));
}

export function getMetadata(locale) {
  if (locale === "ar") {
    return {
      title:
        "الافق للامن و الحماية, شركة رائدة في مجال خدمات الأمن والحماية في الأردن",
      description:
        "الافق للامن و الحماية تقدم حلول أمنية رفيعة المستوى تشمل توفير حراس الأمن، ومراقبة كاميرات وخدمات الإشراف. لتلبية جميع احتياجاتك الأمنية.",
      alternates: {
        canonical: "https://horizon-sp.com/en",
        languages: {
          ar: "https://horizon-sp.com/ar",
          en: "https://horizon-sp.com/en",
        },
      },
      author: "الافق للأمن و الحماية",
      keywords:
        "شركات امن في الأردن , شركات امن وحماية في الاردن , شركة حراسة في الاردن , الافق للامن والحماية, شركات امن وحماية , امن وحماية , شركات امن , شركات حراسة , شركة الامن الأولى في الأردن , شركات دفاع , شركات حراسة اردنية ، شركة الامن الافضل في الاردن ،افضل شركة حراسات امنية في الاردن ",
      openGraph: {
        type: "website",
        url: "https://horizon-sp.com/",
        title: "الافق للامن و الحماية - خدمات الأمن في عمان، الأردن",
        description:
          "الافق للامن و الحاية - خدمات مثالية لضمان سلامتكم و سلامة منشآتكم من خلال حلول الامن المتخصصة و الحراسة المدربة و مراقبة الكاميرات في عمان، الأردن.",
      },
      metadataBase: new URL("https://horizon-sp.com"), // Add this line
    };
  }
  return {
    title:
      "Horizon Security - Leading Security & Protection Services in Jordan",
    description:
      "Horizon Security and Protection is a leading private security company in Jordan, providing tailored security guard services, CCTV monitoring, and consultancy for residential, corporate, and industrial clients. Contact us for the best security solutions in Jordan.",
    alternates: {
      canonical: "https://horizon-sp.com/en",
      languages: {
        ar: "https://horizon-sp.com/ar",
        en: "https://horizon-sp.com/en",
      },
    },
    author: "Horizon Security & Protection",
    keywords:
      "security services, Site Security and protection,Security Consultancy, security guards, CCTV monitoring, supervision, facilities management, security manpower, Horizon Security, Security companies in Jordan, security and protection companies in Jordan, Horizon for Security and Protection, public security, security companies, the best sercurity services company, best security company in Jordan, security training",
    openGraph: {
      type: "website",
      url: "https://horizon-sp.com/",
      title: "Horizon - Premier Security Services in Amman, Jordan",
      description:
        "Horizon offers comprehensive security services, including trained security guards, CCTV monitoring, and supervision in Amman, Jordan. We ensure your safety with expert facility management and security manpower solutions.",
    },
    metadataBase: new URL("https://horizon-sp.com"), // Add this line
  };
}

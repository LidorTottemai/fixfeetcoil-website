import businessConfig from "@/business.config.json";

export const config = {
  siteName: businessConfig.name,
  domain: businessConfig.domain,
  phone: businessConfig.phone,
  whatsapp: businessConfig.whatsapp,
  address: businessConfig.address,
  email: businessConfig.email,
  bookingType: businessConfig.bookingType as "appointment" | "shop",
  brand: businessConfig.brand,
  services: businessConfig.services,
  hours: businessConfig.hours,
  baseUrl: `https://${businessConfig.domain}`,
  whatsappUrl: businessConfig.whatsapp
    ? `https://wa.me/${businessConfig.whatsapp}`
    : null,
};

export default config;

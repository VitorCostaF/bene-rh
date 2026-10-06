export const SITE_URL = 'https://benerh.com.br';
export const SITE_NAME = 'Benê RH';
export const CNPJ = '68.268.439/0001-33';
export const WHATSAPP_NUMBER = '5511992874456';
export const WHATSAPP_DISPLAY = '(11) 99287-4456';
export const LAST_UPDATED = '28 de agosto de 2026';

export const isIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true';

export function whatsappUrl(message = 'Olá, vim pelo site da Benê RH e quero entender qual solução faz sentido para minha empresa.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const defaultMetadata = {
  title: 'Benê RH | RH sob demanda para pequenas e médias empresas',
  description: 'Contratação, estruturação e gestão de pessoas para PMEs crescerem com clareza, sem montar um departamento inteiro de RH.',
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/bene-logo.png`,
  image: `${SITE_URL}/bene-logo.png`,
  taxID: CNPJ,
  telephone: `+${WHATSAPP_NUMBER}`,
  description: defaultMetadata.description,
  areaServed: 'BR',
  founder: {
    '@type': 'Person',
    name: 'Amanda Stamboni',
  },
  sameAs: [],
};

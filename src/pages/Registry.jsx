import SectionHeader from '../components/SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;
const venmoUrl = 'https://venmo.com/u/rafapm22';

export default function Registry() {
  const { t } = useTranslation();
  const methods = [
    { key: 'venmo', name: 'Venmo', recipient: 'Rafael Perez', account: '@rafapm22', image: 'images/registry/venmo-rafapm22.jpg' },
    { key: 'zelle', name: 'Zelle', recipient: 'RAFAEL MARTINEZ', account: '650-613-9824', image: 'images/registry/zelle-rafael-martinez.png' },
  ];
  return (
    <section className="section text-center">
      <SectionHeader title={t('registry.title')} intro={t('registry.message')} centered />
      <div className="mx-auto grid max-w-5xl items-start gap-6 md:grid-cols-2">
        {methods.map((method) => (
          <article key={method.key} className="border border-gold/25 bg-white/60 p-6 sm:p-8">
            <h2 className="font-serif text-4xl">{method.name}</h2>
            <p className="mt-4 leading-7 text-charcoal/75">{t(`registry.${method.key}Copy`)}</p>
            <dl className="mt-5 space-y-2 text-charcoal">
              <div><dt className="text-xs uppercase tracking-widest text-olive">{t('registry.recipient')}</dt><dd className="mt-1 font-semibold">{method.recipient}</dd></div>
              <div>{method.key === 'zelle' && <dt className="text-xs uppercase tracking-widest text-olive">{t('registry.phone')}</dt>}<dd className="mt-1 select-all text-lg">{method.account}</dd></div>
            </dl>
            <a href={assetUrl(method.image)} target="_blank" rel="noreferrer" aria-label={t('registry.fullImage')} className="mt-6 block bg-white p-3">
              <img src={assetUrl(method.image)} alt={t(`registry.${method.key}Alt`)} className="mx-auto h-auto w-full max-w-sm" loading="lazy" />
            </a>
            <a className="mt-3 block text-sm underline underline-offset-4" href={assetUrl(method.image)} target="_blank" rel="noreferrer">{t('registry.fullImage')}</a>
            {method.key === 'venmo' && <a className="button-dark mt-6 inline-block" href={venmoUrl} target="_blank" rel="noreferrer">{t('registry.venmoButton')}</a>}
          </article>
        ))}
      </div>
    </section>
  );
}

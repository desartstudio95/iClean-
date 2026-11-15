import {useEffect} from 'react';
import {siteConfig} from '../config/site';

export interface StructuredBreadcrumb {
  name: string;
  item: string;
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  serviceType: string;
}

interface PageMetadata {
  title: string;
  description: string;
  path?: string;
  breadcrumbs?: StructuredBreadcrumb[];
  serviceSchema?: ServiceSchemaInput;
}

function setMetaTag(
  selector: string,
  attrName: 'name' | 'property',
  key: string,
  content: string
) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useDocumentMetadata({
  title,
  description,
  path,
  breadcrumbs,
  serviceSchema,
}: PageMetadata) {
  useEffect(() => {
    document.title = title;
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag(
      'meta[property="og:description"]',
      'property',
      'og:description',
      description
    );
    setMetaTag(
      'meta[property="og:site_name"]',
      'property',
      'og:site_name',
      siteConfig.brand.name
    );
    setMetaTag(
      'meta[property="og:locale"]',
      'property',
      'og:locale',
      siteConfig.seo.locale
    );
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      description
    );

    if (typeof window === 'undefined') return;

    const baseUrl =
      siteConfig.brand.domain || window.location.origin;
    const resolvedPath = path ?? window.location.pathname;
    const canonicalUrl = `${baseUrl}${resolvedPath}`;

    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);

    let canonicalLink = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Structured Data JSON-LD (Organization, LocalBusiness only when verified, BreadcrumbList, Service)
    const graph: Record<string, unknown>[] = [];

    const configuredSocialUrls = siteConfig.social
      .filter((s) => s.isConfigured && s.href)
      .map((s) => s.href);

    const orgEntity: Record<string, unknown> = {
      '@type': siteConfig.contact.isBusinessInfoVerified
        ? ['Organization', 'LocalBusiness']
        : 'Organization',
      name: siteConfig.brand.name,
      description: siteConfig.brand.description,
      url: baseUrl,
      areaServed: siteConfig.contact.serviceAreas.map((area) => ({
        '@type': 'Place',
        name: area,
      })),
    };

    if (configuredSocialUrls.length > 0) {
      orgEntity.sameAs = configuredSocialUrls;
    }

    if (siteConfig.contact.isBusinessInfoVerified) {
      orgEntity.address = {
        '@type': 'PostalAddress',
        addressLocality: 'Maputo',
        addressCountry: 'MZ',
      };
      if (siteConfig.contact.isWhatsappConfigured) {
        orgEntity.telephone = `+${siteConfig.contact.whatsappNumber}`;
      }
      orgEntity.email = siteConfig.contact.email;
    }

    graph.push(orgEntity);

    if (breadcrumbs && breadcrumbs.length > 0) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: `${baseUrl}${crumb.item}`,
        })),
      });
    }

    if (serviceSchema) {
      graph.push({
        '@type': 'Service',
        name: serviceSchema.name,
        description: serviceSchema.description,
        serviceType: serviceSchema.serviceType,
        provider: {
          '@type': 'Organization',
          name: siteConfig.brand.name,
        },
        areaServed: {
          '@type': 'City',
          name: 'Maputo',
        },
      });
    }

    let ldScript = document.querySelector<HTMLScriptElement>(
      'script[data-iclean-seo="true"]'
    );
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.type = 'application/ld+json';
      ldScript.setAttribute('data-iclean-seo', 'true');
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
  }, [title, description, path, breadcrumbs, serviceSchema]);
}

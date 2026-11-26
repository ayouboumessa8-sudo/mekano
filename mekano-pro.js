(() => {
  "use strict";

  const config = window.MEKANO_CONFIG || {};
  const contact = config.contact || {};
  const social = config.social || {};
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const lang = () => (document.documentElement.lang || "fr").toLowerCase().startsWith("ar") || document.documentElement.dir === "rtl" ? "ar" : "fr";

  const copy = {
    fr: {
      skip: "Aller au contenu principal",
      backToTop: "Retour en haut",
      offline: "Vous êtes hors ligne. Les pages et les images déjà mises en cache restent disponibles.",
      online: "Connexion rétablie.",
      contactPending: "Contact à confirmer",
      contactFooter: "Coordonnées de contact à configurer",
      emailPending: "E-mail et site web à configurer",
      whatsappPending: "WhatsApp n'est pas encore configuré pour cette boutique.",
      searchFocus: "Recherche activée"
    },
    ar: {
      skip: "الانتقال إلى المحتوى الرئيسي",
      backToTop: "العودة إلى الأعلى",
      offline: "أنت غير متصل بالإنترنت. الصفحات والصور المحفوظة مؤقتاً تظل متاحة.",
      online: "تم استرجاع الاتصال بالإنترنت.",
      contactPending: "بيانات التواصل قيد التأكيد",
      contactFooter: "يجب إعداد بيانات التواصل قبل الإطلاق",
      emailPending: "يجب إعداد البريد الإلكتروني والموقع",
      whatsappPending: "رقم واتساب الخاص بالمتجر غير مُعدّ بعد.",
      searchFocus: "تم تفعيل البحث"
    }
  };

  let noticeTimer = 0;
  let networkBanner;
  let liveRegion;

  function notify(message) {
    let notice = $("#mekanoProNotice");
    if (!notice) {
      notice = document.createElement("div");
      notice.id = "mekanoProNotice";
      notice.className = "mekano-pro-notice";
      notice.setAttribute("role", "status");
      notice.setAttribute("aria-live", "polite");
      document.body.appendChild(notice);
    }
    notice.textContent = message;
    notice.classList.add("is-visible");
    window.clearTimeout(noticeTimer);
    noticeTimer = window.setTimeout(() => notice.classList.remove("is-visible"), 3200);
  }

  function announce(message) {
    if (!liveRegion) return;
    liveRegion.textContent = "";
    window.requestAnimationFrame(() => { liveRegion.textContent = message; });
  }

  function setupAccessibility() {
    const main = $("#main-content") || $(".hero, .pneu-hero, .acc-hero");
    if (main && !main.id) main.id = "main-content";
    if (main && !$(".mekano-skip-link")) {
      const skip = document.createElement("a");
      skip.className = "mekano-skip-link";
      skip.href = "#" + main.id;
      skip.textContent = copy[lang()].skip;
      document.body.insertBefore(skip, document.body.firstChild);
    }

    liveRegion = document.createElement("div");
    liveRegion.className = "mekano-sr-only";
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    document.body.appendChild(liveRegion);

    $$('a[target="_blank"]').forEach((link) => {
      const rel = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
      rel.add("noopener");
      rel.add("noreferrer");
      link.setAttribute("rel", Array.from(rel).join(" "));
    });

    $$('button:not([type])').forEach((button) => {
      if (!button.closest("form")) button.type = "button";
    });

    const nameField = $("#coName");
    const phoneField = $("#coPhone");
    const addressField = $("#coAddress");
    const emailField = $("#newsletterEmail");
    if (nameField && !nameField.autocomplete) nameField.autocomplete = "name";
    if (phoneField && !phoneField.autocomplete) {
      phoneField.autocomplete = "tel";
      phoneField.inputMode = "tel";
    }
    if (addressField && !addressField.autocomplete) addressField.autocomplete = "street-address";
    if (emailField && !emailField.autocomplete) {
      emailField.autocomplete = "email";
      emailField.inputMode = "email";
    }

    const accessibleLabels = {
      mcFuel: "Type de carburant / نوع الوقود",
      mcKm: "Kilométrage annuel / المسافة السنوية",
      mcClimate: "Climatisation / المكيف",
      revRating: "Note de votre avis / تقييمك",
      coCity: "Ville de livraison / مدينة التوصيل",
      coPayment: "Mode de paiement / طريقة الدفع",
      tireSort: "Trier les pneus / ترتيب الإطارات",
      gmMake: "Marque du véhicule / ماركة السيارة"
    };
    Object.entries(accessibleLabels).forEach(([id, label]) => {
      const field = document.getElementById(id);
      if (field && !field.hasAttribute("aria-label")) field.setAttribute("aria-label", label);
    });

    const toast = $("#toast");
    if (toast) {
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
    }
  }

  function configureContactDetails() {
    const digits = (value) => String(value || "").replace(/\D/g, "");
    const phone = digits(contact.phoneNumber);
    const email = String(contact.supportEmail || "").trim();
    const website = String(contact.websiteUrl || "").trim();

    $$('[data-pro-phone]').forEach((link) => {
      const label = $("span", link);
      if (phone) {
        link.href = "tel:+" + phone;
        if (label) label.textContent = "+" + phone;
        link.setAttribute("aria-label", "Téléphone MEKANO: +" + phone);
      } else {
        link.href = "#footer";
        if (label) label.textContent = copy[lang()].contactPending;
        link.setAttribute("aria-label", copy[lang()].contactPending);
      }
    });

    $$('[data-pro-phone-label]').forEach((label) => {
      label.textContent = phone ? "+" + phone : copy[lang()].contactFooter;
    });

    $$('[data-pro-email]').forEach((container) => {
      if (!email && !website) {
        const item = container.closest("li");
        if (item) item.remove();
        else container.textContent = copy[lang()].emailPending;
        return;
      }
      container.replaceChildren();
      if (email) {
        const mail = document.createElement("a");
        mail.href = "mailto:" + email;
        mail.textContent = email;
        container.appendChild(mail);
      }
      if (email && website) container.append(" · ");
      if (website) {
        const site = document.createElement("a");
        site.href = /^https?:\/\//i.test(website) ? website : "https://" + website;
        site.target = "_blank";
        site.rel = "noopener noreferrer";
        site.textContent = website.replace(/^https?:\/\//i, "");
        container.appendChild(site);
      }
    });

    $$(".social-row").forEach((row) => {
      const map = { Instagram: "instagram", Facebook: "facebook", WhatsApp: "whatsapp", YouTube: "youtube" };
      $$("a.social-btn", row).forEach((link) => {
        const key = map[link.getAttribute("aria-label") || ""];
        const url = key ? String(social[key] || "").trim() : "";
        if (!url) {
          link.remove();
          return;
        }
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      });
      if (!row.querySelector("a")) row.remove();
    });

    // Card logos are shown only when the corresponding online payment provider is actually configured.
    $$(".payment-badges .pay-chip").forEach((chip) => {
      if (/^(CMI|VISA|Mastercard)$/i.test((chip.textContent || "").trim())) chip.remove();
    });
  }

  function updateLocalizedLabels() {
    const current = copy[lang()];
    const skip = $(".mekano-skip-link");
    if (skip) skip.textContent = current.skip;
    const topButton = $("#mekanoBackToTop");
    if (topButton) topButton.setAttribute("aria-label", current.backToTop);
    $$('[data-pro-phone]').forEach((link) => {
      if (!contact.phoneNumber) {
        const label = $("span", link);
        if (label) label.textContent = current.contactPending;
        link.setAttribute("aria-label", current.contactPending);
      }
    });
    $$('[data-pro-phone-label]').forEach((label) => {
      if (!contact.phoneNumber) label.textContent = current.contactFooter;
    });
    $$('[data-pro-email]').forEach((container) => {
      if (!contact.supportEmail && !contact.websiteUrl) container.textContent = current.emailPending;
    });
    const about = $(".footer-about");
    if (about) {
      about.textContent = lang() === "ar"
        ? "كتالوج إلكتروني لقطع غيار السيارات والإطارات والإكسسوارات. ابحث حسب السيارة أو مرجع القطعة OEM أو مقاس الإطار."
        : "Catalogue en ligne de pièces détachées, pneus et accessoires auto. Recherchez par véhicule, référence OEM ou dimensions de pneus.";
    }
  }

  function setupNetworkStatus() {
    networkBanner = document.createElement("div");
    networkBanner.id = "mekanoNetworkBanner";
    networkBanner.className = "mekano-network-banner";
    networkBanner.setAttribute("role", "status");
    networkBanner.setAttribute("aria-live", "polite");
    document.body.appendChild(networkBanner);

    const sync = () => {
      const current = copy[lang()];
      if (!navigator.onLine) {
        networkBanner.textContent = current.offline;
        networkBanner.classList.add("is-visible", "is-offline");
      } else {
        const wasOffline = networkBanner.classList.contains("is-offline");
        networkBanner.classList.remove("is-offline");
        if (wasOffline) {
          networkBanner.textContent = current.online;
          networkBanner.classList.add("is-visible", "is-online");
          window.setTimeout(() => networkBanner.classList.remove("is-visible", "is-online"), 2400);
        } else {
          networkBanner.classList.remove("is-visible");
        }
      }
    };
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    sync();
  }

  function setupBackToTop() {
    const button = document.createElement("button");
    button.type = "button";
    button.id = "mekanoBackToTop";
    button.className = "mekano-back-to-top";
    button.setAttribute("aria-label", copy[lang()].backToTop);
    button.title = copy[lang()].backToTop;
    button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 14 6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    document.body.appendChild(button);
    const update = () => button.classList.toggle("is-visible", window.scrollY > 520);
    window.addEventListener("scroll", update, { passive: true });
    update();
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  }

  function optimizeImages(root = document) {
    $$('img', root).forEach((img) => {
      if (!img.hasAttribute("decoding")) img.decoding = "async";
      if (!img.hasAttribute("loading")) {
        const isHero = !!img.closest(".hero, .pneu-hero, .acc-hero, .navbar, .brand-logo");
        img.loading = isHero ? "eager" : "lazy";
      }
      if (img.closest(".hero") && !img.hasAttribute("fetchpriority")) img.fetchPriority = "high";
    });
  }

  function setupSearchShortcuts() {
    window.addEventListener("keydown", (event) => {
      const target = event.target;
      const editing = target && (target.matches("input, textarea, select") || target.isContentEditable);
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        const input = $("#headerSearchInput") || $("#quickSearchInput") || $("#afQuery");
        if (input) {
          input.focus();
          input.scrollIntoView({ block: "center", behavior: "smooth" });
          announce(copy[lang()].searchFocus);
        }
      }
      if (event.key === "Escape") {
        const openModal = $(".modal.open");
        const close = openModal && $(".close-btn", openModal);
        if (close) close.click();
        const drawer = $(".cart-drawer.open");
        if (drawer) {
          const closeCart = $("#closeCartBtn");
          if (closeCart) closeCart.click();
        }
      }
      if (event.key === "/" && !editing && !event.ctrlKey && !event.metaKey && !event.altKey) {
        const input = $("#headerSearchInput") || $("#quickSearchInput") || $("#afQuery");
        if (input) {
          event.preventDefault();
          input.focus();
          announce(copy[lang()].searchFocus);
        }
      }
    });
  }

  function setupCartAnnouncements() {
    const count = $("#cartCount");
    if (!count || !window.MutationObserver) return;
    const observer = new MutationObserver(() => {
      announce((lang() === "ar" ? "عدد المنتجات في السلة: " : "Articles dans le panier : ") + count.textContent.trim());
    });
    observer.observe(count, { childList: true, characterData: true, subtree: true });
  }

  function setupLanguageObserver() {
    const observer = new MutationObserver(() => updateLocalizedLabels());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "dir"] });
  }

  function init() {
    setupAccessibility();
    configureContactDetails();
    updateLocalizedLabels();
    setupNetworkStatus();
    setupBackToTop();
    optimizeImages();
    setupSearchShortcuts();
    setupCartAnnouncements();
    setupLanguageObserver();

    if (window.MutationObserver) {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) optimizeImages(node);
          });
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    window.MEKANO_PRO = Object.freeze({
      notify,
      getConfig: () => config
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();

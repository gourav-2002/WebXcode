/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home, { QuoteModal } from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import RefundPolicy from './pages/RefundPolicy';
import OurWork from './pages/OurWork';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Industries from './pages/Industries';
import Services from './pages/Services';
import AISolutions from './pages/AISolutions';
import AiChatbotDevelopment from './pages/ai-solutions/AiChatbotDevelopment';
import WhatsappAiChatbot from './pages/ai-solutions/WhatsappAiChatbot';
import AiVoiceAgents from './pages/ai-solutions/AiVoiceAgents';
import CustomAiLlmIntegration from './pages/ai-solutions/CustomAiLlmIntegration';
import AiGeneratedVideos from './pages/ai-solutions/AiGeneratedVideos';
import AiContentCreation from './pages/ai-solutions/AiContentCreation';
import AiPoweredSeo from './pages/ai-solutions/AiPoweredSeo';
import AiAdCreatives from './pages/ai-solutions/AiAdCreatives';
import AiWorkflowAutomation from './pages/ai-solutions/AiWorkflowAutomation';
import AiAgentsForBusiness from './pages/ai-solutions/AiAgentsForBusiness';
import CrmLeadAutomation from './pages/ai-solutions/CrmLeadAutomation';
import AiAnalyticsReporting from './pages/ai-solutions/AiAnalyticsReporting';
import WebsiteDevelopment from './pages/services/WebsiteDevelopment';
import EcommerceDevelopment from './pages/services/EcommerceDevelopment';
import MobileAppDevelopment from './pages/services/MobileAppDevelopment';
import WordpressShopifyDevelopment from './pages/services/WordpressShopifyDevelopment';
import WebsiteMaintenanceSupport from './pages/services/WebsiteMaintenanceSupport';
import ManagedItServices from './pages/services/ManagedItServices';
import SeoServices from './pages/services/SeoServices';
import LocalSeo from './pages/services/LocalSeo';
import AeoServices from './pages/services/AeoServices';
import GeoServices from './pages/services/GeoServices';
import PerformanceMarketing from './pages/services/PerformanceMarketing';
import GoogleAds from './pages/services/GoogleAds';
import ConversionRateOptimization from './pages/services/ConversionRateOptimization';
import AnalyticsTrackingSetup from './pages/services/AnalyticsTrackingSetup';
import BrandingLogoDesign from './pages/services/BrandingLogoDesign';
import CreativeCommunication from './pages/services/CreativeCommunication';
import Copywriting from './pages/services/Copywriting';
import EmailMarketing from './pages/services/EmailMarketing';
import B2BSaaS from './pages/industries/B2BSaaS';
import FinanceFintech from './pages/industries/FinanceFintech';
import InteriorDesignArchitecture from './pages/industries/InteriorDesignArchitecture';
import ManufacturingIndustrial from './pages/industries/ManufacturingIndustrial';
import Ecommerce from './pages/industries/Ecommerce';
import SkincareBeauty from './pages/industries/SkincareBeauty';
import HomeDecorFurniture from './pages/industries/HomeDecorFurniture';
import FashionLifestyle from './pages/industries/FashionLifestyle';
import Healthcare from './pages/industries/Healthcare';
import TravelHospitality from './pages/industries/TravelHospitality';
import EducationEdtech from './pages/industries/EducationEdtech';
import Delhi from './pages/locations/Delhi';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function ScrollToTopAndHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Website Development');

  const handleOpenQuoteModal = (service?: string) => {
    if (service) {
      setSelectedService(service);
    }
    setQuoteModalOpen(true);
  };

  useEffect(() => {
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string | undefined>;
      handleOpenQuoteModal(customEvent.detail);
    };
    window.addEventListener('open-quote-modal', handleCustomEvent);
    return () => window.removeEventListener('open-quote-modal', handleCustomEvent);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-navy">
      <ScrollToTopAndHash />
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              quoteModalOpen={quoteModalOpen}
              selectedService={selectedService}
              onOpenQuoteModal={handleOpenQuoteModal}
              onCloseQuoteModal={() => setQuoteModalOpen(false)}
            />
          }
        />
        <Route
          path="/about"
          element={<About onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/contact"
          element={<Contact onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/terms-and-conditions"
          element={<TermsConditions onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route
          path="/our-work"
          element={<OurWork onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/blog"
          element={<Blog onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/blog/:slug"
          element={<BlogPost onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/industries"
          element={<Industries onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services"
          element={<Services onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/ai-solutions"
          element={<AISolutions onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/ai-solutions/ai-chatbot-development"
          element={<AiChatbotDevelopment onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/ai-solutions/whatsapp-ai-chatbot"
          element={<WhatsappAiChatbot onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/ai-solutions/ai-voice-agents"
          element={<AiVoiceAgents onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/ai-solutions/custom-ai-llm-integration"
          element={<CustomAiLlmIntegration onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/ai-solutions/ai-generated-videos"
          element={<AiGeneratedVideos onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/ai-solutions/ai-content-creation"
          element={<AiContentCreation onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/ai-solutions/ai-powered-seo"
          element={<AiPoweredSeo onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/ai-solutions/ai-ad-creatives"
          element={<AiAdCreatives onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/ai-solutions/ai-workflow-automation"
          element={<AiWorkflowAutomation onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/ai-solutions/ai-agents-for-business"
          element={<AiAgentsForBusiness onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/ai-solutions/crm-lead-automation"
          element={<CrmLeadAutomation onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/ai-solutions/ai-analytics-reporting"
          element={<AiAnalyticsReporting onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/website-development"
          element={<WebsiteDevelopment onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/ecommerce-development"
          element={<EcommerceDevelopment onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/mobile-app-development"
          element={<MobileAppDevelopment onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/wordpress-shopify-development"
          element={<WordpressShopifyDevelopment onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/website-maintenance-support"
          element={<WebsiteMaintenanceSupport onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/managed-it-services"
          element={<ManagedItServices onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/seo-services"
          element={<SeoServices onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/local-seo"
          element={<LocalSeo onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/aeo-services"
          element={<AeoServices onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/geo-generative-engine-optimization"
          element={<GeoServices onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/performance-marketing"
          element={<PerformanceMarketing onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/google-ads-sem"
          element={<GoogleAds onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/conversion-rate-optimization"
          element={<ConversionRateOptimization onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/analytics-tracking-setup"
          element={<AnalyticsTrackingSetup onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/branding-logo-design"
          element={<BrandingLogoDesign onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/creative-communication"
          element={<CreativeCommunication onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/copywriting"
          element={<Copywriting onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/services/email-marketing"
          element={<EmailMarketing onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/industries/b2b-saas"
          element={<B2BSaaS onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/industries/finance-fintech"
          element={<FinanceFintech onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/industries/interior-design-architecture"
          element={
            <InteriorDesignArchitecture
              onOpenQuoteModal={handleOpenQuoteModal}
            />
          }
        />
        <Route
          path="/industries/manufacturing-industrial"
          element={
            <ManufacturingIndustrial
              onOpenQuoteModal={handleOpenQuoteModal}
            />
          }
        />
        <Route
          path="/industries/ecommerce"
          element={<Ecommerce onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/industries/skincare-beauty"
          element={<SkincareBeauty onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/industries/home-decor-furniture"
          element={
            <HomeDecorFurniture onOpenQuoteModal={handleOpenQuoteModal} />
          }
        />
        <Route
          path="/industries/fashion-lifestyle"
          element={
            <FashionLifestyle onOpenQuoteModal={handleOpenQuoteModal} />
          }
        />
        <Route
          path="/industries/healthcare"
          element={<Healthcare onOpenQuoteModal={handleOpenQuoteModal} />}
        />
        <Route
          path="/industries/travel-hospitality"
          element={
            <TravelHospitality onOpenQuoteModal={handleOpenQuoteModal} />
          }
        />
        <Route
          path="/industries/education-edtech"
          element={
            <EducationEdtech onOpenQuoteModal={handleOpenQuoteModal} />
          }
        />
        <Route
          path="/locations/delhi"
          element={<Delhi onOpenQuoteModal={handleOpenQuoteModal} />}
        />
      </Routes>
      <Footer />
      <WhatsAppButton onOpenQuoteModal={handleOpenQuoteModal} />
      <QuoteModal
        isOpen={quoteModalOpen}
        defaultService={selectedService}
        onClose={() => setQuoteModalOpen(false)}
      />
    </div>
  );
}




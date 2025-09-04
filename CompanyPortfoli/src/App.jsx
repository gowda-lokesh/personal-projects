import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartupLandingPage from './StartupLandingPage';
import DemandForecastingPage from './DemandForecastingPage';
import PredictiveAnalyticsPage from './PredictiveAnalyticsPage';
import PricingPromotionAnalyticsPage from './PricingPromotionAnalyticsPage';
import ClassificationAnomalyDetectionPage from './ClassificationAnomalyDetectionPage';
import ComputerVisionNLPPage from './ComputerVisionAndNLPPage';
import GenerativeAILLMPage from './GenerativeAILLMPage';
import DataBusinessInsightPage from './DataAndBusinessInsightsPage';
import EcommerceAnalyticsPage from './EcommerceAnalyticsPage';
import CaseStudiesPage from './CaseStudiesPage';
import ContactPage from './ContactPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartupLandingPage />} />
        <Route path="/demand-forecasting" element={<DemandForecastingPage />} />
        <Route path="/predictive-analytics" element={<PredictiveAnalyticsPage />} />
        <Route path="/pricing-promotion-analytics" element={<PricingPromotionAnalyticsPage />} />
        <Route path="/classification-anomaly-detection" element={<ClassificationAnomalyDetectionPage />} />
        <Route path="/computer-vision-nlp" element={<ComputerVisionNLPPage />} />
        <Route path="/generative-ai-llm" element={<GenerativeAILLMPage />} />
        <Route path="/data-business-insights" element={<DataBusinessInsightPage />} />
        <Route path="/ecommerce-analytics" element={<EcommerceAnalyticsPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

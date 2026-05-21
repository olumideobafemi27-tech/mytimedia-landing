import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight,
  TrendingDown,
  Users,
  Video,
  Plane,
  Download,
  BookOpen,
  Award,
  FileText,
  BadgeAlert,
  HelpCircle,
  Clock,
  Unlock,
  Sparkles,
  Check,
  Flame,
  Star,
  Lock,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function App() {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Pop-up modal state variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalName, setModalName] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalIsLoading, setModalIsLoading] = useState(false);
  
  // Real high-converting countdown timer (15 minutes)
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins in seconds
  const [spotsLeft, setSpotsLeft] = useState(17);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 900));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const spotsTimer = setInterval(() => {
      setSpotsLeft((prev) => {
        if (prev <= 3) return 17;
        return Math.random() > 0.7 ? prev - 1 : prev;
      });
    }, 8000);
    return () => clearInterval(spotsTimer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const executeRedirect = (name: string, email: string) => {
    // Fire Google Tag Manager 'Click' event
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "Click",
        category: "Lead Capture",
        action: "CTA Form Submit",
        label: "Selar Redirect",
        fullname: name,
        email: email
      });
    }

    // Go to the prefilled payment checkpoint URL as required
    const encodedName = encodeURIComponent(name.trim());
    const encodedEmail = encodeURIComponent(email.trim());
    const targetUrl = `https://selar.com/b6pz7b3595?add_to_cart=1&fullname=${encodedName}&email=${encodedEmail}`;
    window.location.href = targetUrl;
  };

  // Handler for embedded inline form
  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput || !emailInput.includes("@")) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      executeRedirect(nameInput, emailInput);
    }, 1000);
  };

  // Handler for Modal pop-up form
  const handleModalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!modalName.trim() || !modalEmail || !modalEmail.includes("@")) return;
    setModalIsLoading(true);
    setTimeout(() => {
      setModalIsLoading(false);
      setIsModalOpen(false);
      executeRedirect(modalName, modalEmail);
    }, 1000);
  };

  const scrollToCheckout = () => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-red-100 selection:text-red-900 overflow-x-hidden">
      {/* Top Urgent Alert Bar */}
      <div className="bg-red-600 text-white text-xs md:text-sm font-semibold py-2.5 px-4 text-center flex items-center justify-center gap-2 relative z-50 shadow-md">
        <Flame className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
        <span><strong>AD DISCOUNT:</strong> ₦15,000 price slashed to <strong>₦3,000</strong>! Offer reserved for <strong>{formatTime(timeLeft)}</strong> mins</span>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center">
              <Plane className="text-white w-5 h-5 -rotate-45" />
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900">Canada<span className="text-red-600">DIY</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
            <a href="#why" className="hover:text-red-600 transition-colors">Why DIY?</a>
            <a href="#problem" className="hover:text-red-600 transition-colors">The Problem</a>
            <a href="#modules" className="hover:text-red-600 transition-colors">What's Inside</a>
            <a href="#testimonials" className="hover:text-red-600 transition-colors">Success Stories</a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 py-1.5 px-3 rounded-full border border-red-100">
              <Sparkles className="w-3.5 h-3.5 text-red-500" /> Only ₦3,000 Today
            </span>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full px-5 font-bold shadow-md shadow-red-200"
            >
              Get Access Now
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* Social Proof Bar */}
        <div className="bg-slate-900 text-slate-300 py-3 px-4 border-b border-slate-800 text-xs md:text-sm">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span><strong>84 Nigerians</strong> currently browsing this presentation</span>
            </div>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <span className="text-white ml-2">4.9/5 Rating from over 2,400+ members</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden bg-white border-b border-slate-100">
          <div className="absolute top-0 right-0 w-1/3 h-full mix-blend-multiply opacity-[0.07] pointer-events-none">
             <img 
              src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80" 
              alt="Canada Flag Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              <motion.div {...fadeIn}>
                <div className="inline-flex items-center gap-1.5 mb-5 border border-red-200 text-red-600 bg-red-50/70 py-1.5 px-3.5 rounded-full font-bold text-xs">
                  <Flame className="w-3.5 h-3.5 animate-bounce" /> 
                  META ADS SPECIAL SLICE — 80% DISCOUNT INSTANT ACCESS
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold leading-[1.1] mb-6 text-slate-905 tracking-tight">
                  Stop Paying Relocation Agents <span className="text-red-600 block sm:inline underline decoration-red-200 decoration-wavy">₦700k to ₦1M</span> Just to Get a Canada Visa Refusal!
                </h1>
                
                <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl">
                  Most Nigerians waste years writing IELTS multiple times or losing millions to travel scammers because they don’t know the exact immigration pathways available for their age or profession. <strong>Do this instead!</strong>
                </p>

                {/* Direct High Converting Urgency Stats */}
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center max-w-2xl">
                  <div>
                    <span className="text-xs text-red-600 font-bold block uppercase tracking-wider">Discount Price Available Today</span>
                    <span className="text-2xl font-black text-slate-900">₦3,000 <span className="text-sm font-normal text-slate-400 line-through">₦15,000</span></span>
                  </div>
                  <div className="bg-white/90 border border-red-200 rounded-xl py-2 px-4 shadow-sm shrink-0 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-red-600 animate-pulse" />
                    <div>
                      <span className="text-xs text-slate-400 block font-semibold uppercase">Spots Remaining</span>
                      <span className="text-sm font-bold text-red-600">Only {spotsLeft} copies left today</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                  <Button 
                    size="lg" 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-red-600 hover:bg-red-700 text-white h-14 px-8 text-lg rounded-xl shadow-xl shadow-red-200 flex items-center justify-center gap-2 transform transition-transform hover:scale-102 active:scale-98"
                  >
                    Get Instant Access Now (₦3,000)
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => {
                      document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="h-14 px-8 text-lg rounded-xl border-slate-200 bg-slate-50 hover:bg-slate-100"
                  >
                    See The 5 Modules
                  </Button>
                </div>
                
                <div className="mt-12 flex flex-wrap items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                        <img 
                          src={`https://picsum.photos/seed/nigerian_success_ads_${i}/100/100`} 
                          alt="Nigerian Relocated" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-slate-600">
                    <span className="text-slate-900 font-bold block">🚀 Moving Countless Immigrants Legally</span>
                    <span>100% DIY, no tricky consultants.</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* The Problem & Solution Section */}
        <section id="problem" className="py-20 lg:py-24 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
              {/* THE PROBLEM */}
              <div className="bg-red-50/55 rounded-3xl p-8 lg:p-12 border border-red-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-red-600 mb-6">
                    <XCircle className="w-6 h-6 shrink-0" />
                    <span className="font-heading font-bold uppercase tracking-wider text-sm">The Bleeding Reality</span>
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-slate-900 mb-4">THE PROBLEM</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    You've probably seen it over and over again on the news or in your friend group:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-red-100/70 flex gap-4 shadow-sm">
                      <div className="p-2 h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                        <BadgeAlert className="text-red-500 w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Fake agents charging ₦500k – ₦3M</h4>
                        <p className="text-xs text-slate-500 mt-1">Leaving hard-working families broke and devastated with immediate visa refusals.</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-red-100/70 flex gap-4 shadow-sm">
                      <div className="p-2 h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                        <TrendingDown className="text-red-500 w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Confusing YouTube videos</h4>
                        <p className="text-xs text-slate-500 mt-1">Hours of generic, circular discussions that lead to more self-doubt and inaction.</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-red-100/70 flex gap-4 shadow-sm">
                      <div className="p-2 h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                        <AlertCircle className="text-red-500 w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Outdated or incomplete information</h4>
                        <p className="text-xs text-slate-500 mt-1">Missing crucial policy updates regarding IRCC, student caps, or visa guidelines.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-red-100 bg-red-100/20 -mx-8 -mb-8 p-8 rounded-b-3xl">
                  <p className="text-slate-800 font-bold text-lg italic text-center">
                    “How do I actually relocate to Canada the right way?”
                  </p>
                </div>
              </div>

              {/* THE SOLUTION */}
              <div id="solution" className="bg-slate-900 rounded-3xl p-8 lg:p-12 text-white flex flex-col justify-between border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl"></div>
                
                <div>
                  <div className="flex items-center gap-2.5 text-red-500 mb-6">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <span className="font-heading font-bold uppercase tracking-wider text-sm">The Absolute Antidote</span>
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-white mb-4">THE SOLUTION</h3>
                  <p className="text-slate-300 mb-8 leading-relaxed">
                    This plug-and-play visual presentation shows you exactly how Nigerians are relocating to Canada using scholarships and direct applications—<strong>no middlemen, no guesswork.</strong>
                  </p>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="h-6 w-6 rounded-full bg-red-600 flex items-center justify-center shrink-0 mt-1">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-white">Official Portals & Real Processes</h4>
                        <p className="text-slate-400 text-sm">Everything built directly around current IRCC frameworks and university websites.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="h-6 w-6 rounded-full bg-red-600 flex items-center justify-center shrink-0 mt-1">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-white">Proven DIY School Strategies</h4>
                        <p className="text-slate-400 text-sm">Step-by-step methods that have successfully bypassed costly relocation agents.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="h-6 w-6 rounded-full bg-red-600 flex items-center justify-center shrink-0 mt-1">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-white">Direct Scholarship Pipelines</h4>
                        <p className="text-slate-400 text-sm">Targeted lists and templates to secure fully funded spots in multiple provinces.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-slate-800 rounded-2xl border border-slate-700/80">
                  <p className="text-sm text-slate-300">
                    We have helped countless immigrants move to Canada by simply giving them the right, high-impact legal information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modules Grid - WHAT YOU'LL GET */}
        <section id="modules" className="py-20 lg:py-24 bg-slate-50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="bg-red-600 text-white mb-3">The Visual Curriculum</Badge>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-950">WHAT YOU’LL GET</h2>
              <p className="text-slate-600 mt-4 text-base md:text-lg">
                The absolute plug-and-play visual blueprint divided into 5 thorough modules + high-value bonuses.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Module 1 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between hover:border-red-100 transition-all group">
                <div>
                  <Badge className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-100 mb-6 px-3 py-1 font-bold">
                    MODULE 1
                  </Badge>
                  <h3 className="text-xl font-heading font-bold text-slate-950 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-red-600 shrink-0" />
                    Understanding the Canada Study Route
                  </h3>
                  <Separator className="my-4 bg-slate-100" />
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>How relocation through school works from A to Z</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>Why scholarships are your absolute best option</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 text-xs text-slate-400 font-mono">ESTIMATED STUDY TIME: 30 MINS</div>
              </div>

              {/* Module 2 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between hover:border-red-100 transition-all group">
                <div>
                  <Badge className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-100 mb-6 px-3 py-1 font-bold">
                    MODULE 2
                  </Badge>
                  <h3 className="text-xl font-heading font-bold text-slate-950 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-red-600 shrink-0" />
                    How to Find Scholarships (Step-by-Step)
                  </h3>
                  <Separator className="my-4 bg-slate-100" />
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>Where to find legit scholarships in Canada</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>Government vs university vs private scholarships</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>The essential triggers to avoid fake opportunities</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 text-xs text-slate-400 font-mono">ESTIMATED STUDY TIME: 45 MINS</div>
              </div>

              {/* Module 3 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between hover:border-red-100 transition-all group">
                <div>
                  <Badge className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-100 mb-6 px-3 py-1 font-bold">
                    MODULE 3
                  </Badge>
                  <h3 className="text-xl font-heading font-bold text-slate-950 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-red-600 shrink-0" />
                    Applying to Canadian Schools Yourself
                  </h3>
                  <Separator className="my-4 bg-slate-100" />
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>How to choose the perfect, highly receptive school</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>Admission requirements simplified & explained</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>How to apply easily without ever hiring an agent</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 text-xs text-slate-400 font-mono">ESTIMATED STUDY TIME: 50 MINS</div>
              </div>

              {/* Module 4 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between hover:border-red-100 transition-all group">
                <div>
                  <Badge className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-100 mb-6 px-3 py-1 font-bold">
                    MODULE 4
                  </Badge>
                  <h3 className="text-xl font-heading font-bold text-slate-950 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-red-600 shrink-0" />
                    How to Increase Your Chances of Getting Funded
                  </h3>
                  <Separator className="my-4 bg-slate-100" />
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>What Canadian admissions panels search for</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>Simple visual tricks to completely stand out</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>The deadly mistakes that get Nigerians rejected</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 text-xs text-slate-400 font-mono">ESTIMATED STUDY TIME: 40 MINS</div>
              </div>

              {/* Module 5 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between hover:border-red-100 transition-all group">
                <div>
                  <Badge className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-100 mb-6 px-3 py-1 font-bold">
                    MODULE 5
                  </Badge>
                  <h3 className="text-xl font-heading font-bold text-slate-950 mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-red-600 shrink-0" />
                    Study Permit (Visa) Application Guide
                  </h3>
                  <Separator className="my-4 bg-slate-100" />
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>Thorough step-by-step visual visa flow</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>The checklist of actual required documents</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>How to submit everything online entirely yourself</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 text-xs text-slate-400 font-mono">ESTIMATED STUDY TIME: 60 MINS</div>
              </div>

              {/* Bonus Card */}
              <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/25 rounded-full blur-2xl"></div>
                <div>
                  <Badge className="bg-red-600 text-white mb-6 px-3 py-1 font-bold">
                    VALUABLE BONUSES
                  </Badge>
                  <h3 className="text-xl font-heading font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-red-400 shrink-0" />
                    Special Extra Toolkit Included
                  </h3>
                  <Separator className="my-4 bg-slate-800" />
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span><strong>List of scholarship websites</strong> to apply immediately</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span><strong>Sample application tips</strong> with real email drafts</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span><strong>Step-by-step checklist</strong> for easy tracking</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 text-xs text-slate-400 font-mono">INSTANT ACCESS ON BLUEPRINT</div>
              </div>
            </div>
          </div>
        </section>

        {/* High Converting WhatsApp/Social Testimonials Section */}
        <section id="testimonials" className="py-20 lg:py-24 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border border-red-205 mb-3">Real Nigerians, Real Success</Badge>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900">What Nigerians are Saying</h2>
              <p className="text-slate-600 mt-2">These are genuine feedback snippets from some of our successful DIY presentation students.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  sender: "Omeruo K., Lagos",
                  quote: "I thought study permit was impossible without connection. Applying myself using this video step-by-step got me approved in 6 weeks! Thank you so much for saving me from my ₦1.5M agent loss.",
                  status: "Moved to Toronto, Oct 2025"
                },
                {
                  sender: "Tunde Shola, Ibadan",
                  quote: "This is the most transparent guide on Canadian schools out there. Easily navigated the application portals, and got admission with complete tuition coverage! Best ₦3,000 I ever spent in my entire life.",
                  status: "Scholarship recipient, UBC"
                },
                {
                  sender: "Amaka J., Abuja",
                  quote: "Agents refused telling me about WAEC medium of instruction letter because they wanted to take money for IELTS lessons. This DIY kit exposed everything beautifully. Highly recommended for every single Nigerian trying to japa.",
                  status: "Moved to Winnipeg, Dec 2025"
                }
              ].map((testi, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-8 relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-500 mb-4">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <p className="text-slate-600 italic text-sm leading-relaxed mb-6">"{testi.quote}"</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{testi.sender}</h5>
                    <span className="text-xs text-red-600 font-semibold">{testi.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Makes This Different Section */}
        <section id="different" className="py-20 bg-slate-950 text-white relative">
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mb-16">
              <span className="text-red-500 text-sm font-bold tracking-widest uppercase block mb-3">Unlike Generic PDFs</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">WHAT MAKES THIS DIFFERENT</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "No Agent Required",
                  icon: "🚫",
                  desc: "Keeps ₦1,000,000+ in your bank. You write your own destiny directly with the schools."
                },
                {
                  title: "Real Platforms",
                  icon: "💻",
                  desc: "No general advice. Direct instructions based on official IRCC & university portals."
                },
                {
                  title: "Beginner-Friendly",
                  icon: "👶",
                  desc: "No prior experience required. Simplified language designed specifically for Nigerians."
                },
                {
                  title: "No Fluff. Directly to point",
                  icon: "⚡",
                  desc: "No 3-hour long boring recordings. Strictly the tools, portals, links, and blueprints."
                }
              ].map((diff, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-colors">
                  <div className="text-3xl mb-4">{diff.icon}</div>
                  <h4 className="font-bold text-lg text-white mb-2">{diff.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{diff.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who This Is For Section */}
        <section id="target" className="py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50 mb-3 px-3 py-1 font-semibold">Perfect Alignment</Badge>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-950">WHO THIS IS FOR</h2>
              <p className="text-slate-600 mt-4 leading-relaxed">
                This presentation was designed for a select audience seeking immediate, legitimate, stress-free results.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <CheckCircle2 className="w-8 h-8 text-green-500" />,
                  title: "Nigerians who want to relocate legally",
                  desc: "Tired of looking left and right, hoping for a back-door route, and ready to walk a clean, proven legal path."
                },
                {
                  icon: <GraduationCap className="w-8 h-8 text-green-500" />,
                  title: "Students looking for scholarships abroad",
                  desc: "Ambitious scholars wanting a Canadian degree but lacking millions for tuition. We highlight how to secure funding."
                },
                {
                  icon: <Users className="w-8 h-8 text-green-500" />,
                  title: "Anyone tired of paying greedy agents",
                  desc: "If you're tired of hearing stories, paying millions extra, or suffering generic rejections, this is your key."
                }
              ].map((target, key) => (
                <div key={key} className="p-8 border border-slate-100 rounded-3xl bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="mb-6">{target.icon}</div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{target.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{target.desc}</p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-100 text-xs text-red-600 font-bold tracking-wider uppercase">
                    100% SUITED FOR YOU
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Price & Checkout (DIY form integration) */}
        <section id="checkout" className="py-20 lg:py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4">
            <Card className="rounded-[2.5rem] border-slate-105 overflow-hidden shadow-2xl bg-white border border-slate-100">
              <div className="bg-red-600 p-8 text-white text-center relative">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <img 
                    src="https://images.unsplash.com/photo-1517935703635-27c736827a2e?auto=format&fit=crop&q=80" 
                    alt="Canada" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="relative z-10 space-y-2">
                  <Badge className="bg-white/20 hover:bg-white/20 text-white py-1 px-3 border border-white/20 font-bold">
                    SECURE DIY ENROLLMENT GATEWAY
                  </Badge>
                  <h3 className="text-3xl font-heading font-black">Get Access to the DIY Kit Now</h3>
                  <p className="text-red-100 text-sm max-w-md mx-auto">Instant credentials and download files sent in real-time to your inbox.</p>
                </div>
              </div>

              <CardContent className="p-8 md:p-12 space-y-8">
                <div className="text-center bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <span className="text-slate-400 text-sm line-through block font-medium">Regular Price Plan: ₦15,000</span>
                  <span className="text-5xl md:text-6xl font-heading font-black text-slate-900 block my-1.5">
                    ₦3,000 <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold uppercase relative -top-3.5 inline-block">Ad Discount</span>
                  </span>
                  <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold text-sm mt-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>One-time secure payment. No hidden agent fees.</span>
                  </div>
                </div>

                {/* Secure Checkout Form */}
                {!isSuccess ? (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-widest block">
                        YOUR FULL NAME:
                      </label>
                      <input 
                        type="text" 
                        required
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder="e.g. Tunde Shola"
                        className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 font-medium text-base transition-colors bg-slate-50/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-widest block">
                        ENTER YOUR ACTIVE EMAIL:
                      </label>
                      <input 
                        type="email" 
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="e.g. name@gmaildom.com"
                        className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 font-medium text-base transition-colors bg-slate-50/50"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xl shadow-lg shadow-red-200 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isLoading ? "Generating Secure Payment Token..." : "UNLOCK THE KIT & PRESENTATION NOW"}
                    </Button>
                    
                    <div className="flex justify-center items-center gap-4 text-slate-400 text-xs pt-2">
                      <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-500" /> 256-Bit SSL Secured</span>
                      <span>•</span>
                      <span>Instant Access Delivered</span>
                    </div>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-emerald-50 rounded-2xl border border-emerald-100 text-center space-y-5"
                  >
                    <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-emerald-950">Unlock Token Generated!</h4>
                      <p className="text-sm text-emerald-700 mt-2 max-w-md mx-auto leading-relaxed">
                        Hello, <strong>{nameInput}</strong>! A secure, direct login code and digital password has been transmitted immediately to <strong>{emailInput}</strong>. Check your inbox or promotions folder.
                      </p>
                    </div>
                    <Button 
                      onClick={() => setIsSuccess(false)}
                      variant="outline"
                      className="text-xs border-emerald-200 text-emerald-800 hover:bg-emerald-100 h-10 px-6 font-bold"
                    >
                      Restart with Alternative Email Address
                    </Button>
                  </motion.div>
                )}

                {/* IMPORTANT NOTE & DISCLAIMER - Architecture Honesty Constraint */}
                <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-6 relative">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-extrabold text-amber-800 text-xs tracking-wider uppercase mb-1">IMPORTANT DISCLAIMER NOTE</h5>
                      <p className="text-xs text-amber-700 leading-relaxed">
                        This is not "immigrant magic", instant visa cheat-codes, or an illegal back-door route. It is a highly practical legal blueprint mapping out direct channels, application steps, and templates. Your personal effort and educational background strictly direct your success.
                      </p>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Common Questions</Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Frequently Asked Questions</h2>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="bg-slate-50/65 rounded-2xl border-none shadow-sm px-6 hover:shadow-md transition-all">
                <AccordionTrigger className="hover:no-underline font-bold text-left py-6 text-slate-900">Do I really need an agent?</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  Absolutely not. Thousands of Canadians move every year using the DIY method. Agents often just fill the same forms you can fill yourself, charging you 10x the actual cost. We show you exactly how to do it.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="bg-slate-50/65 rounded-2xl border-none shadow-sm px-6 hover:shadow-md transition-all">
                <AccordionTrigger className="hover:no-underline font-bold text-left py-6 text-slate-900">Is IELTS required for all routes?</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  No. While many routes require IELTS, there are specific study and work pathways where English proficiency can be proven through other means (like your WAEC results or medium of instruction letters). We highlight these in the kit.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="bg-slate-50/65 rounded-2xl border-none shadow-sm px-6 hover:shadow-md transition-all">
                <AccordionTrigger className="hover:no-underline font-bold text-left py-6 text-slate-905">What if I have been refused before?</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  Many people who used our kit had prior refusals. Usually, refusals happen because of a weak Statement of Purpose (SOP) or lack of proof of ties to home. We include templates that help you address previous refusals effectively.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="bg-slate-50/65 rounded-2xl border-none shadow-sm px-6 hover:shadow-md transition-all">
                <AccordionTrigger className="hover:no-underline font-bold text-left py-6 text-slate-900">Is this valid for 2024/2025/2026?</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  Yes, our content is updated regularly to reflect the latest IRCC policy changes, including the brand new student cap caps as well as provincial attestation rules.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      {/* Floating Sticky Bottom Bar for Mobile Conversion from Meta Ads */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 md:hidden shadow-lg flex items-center justify-between gap-4">
        <div>
          <span className="text-2xs text-slate-400 block font-bold uppercase tracking-wider">SPECIAL PROMOTIONAL AD PRICE</span>
          <span className="text-lg font-black text-slate-900">₦3,000 <span className="text-xs text-red-650 font-bold ml-1.5 bg-red-50 py-0.5 px-1.5 rounded">{formatTime(timeLeft)}</span></span>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold h-12 px-5 text-sm rounded-xl shrink-0 shadow-md shadow-red-200"
        >
          CLAIM ACCESS NO
        </Button>
      </div>

      {/* Spacing for mobile floating bar */}
      <div className="h-16 md:hidden"></div>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
              <Plane className="text-white w-3.5 h-3.5 -rotate-45" />
            </div>
            <span className="font-heading font-extrabold text-lg">CanadaDIY</span>
          </div>
          <div className="text-slate-500 text-xs max-w-md text-center md:text-right">
            &copy; {new Date().getFullYear()} Moving To Canada DIY. This application is not affiliated with, authorized, or endorsed by IRCC or the Government of Canada.
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-red-600">Privacy Policy</a>
            <a href="#" className="hover:text-red-600">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Premium Pop-up Lead Capture Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-w-lg w-full relative z-10"
            >
              <div className="bg-red-650 p-6 text-white text-center relative border-b border-red-700 bg-red-600">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                  aria-label="Close modal"
                >
                  <XCircle className="w-6 h-6 font-bold" />
                </button>
                <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold border border-white/20 mb-2">
                  <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>SPECIAL SPOT RESERVED ({formatTime(timeLeft)})</span>
                </div>
                <h4 className="text-2xl font-black tracking-tight">Complete Spot Reservation</h4>
                <p className="text-xs text-red-100 mt-1">Get immediate credentials and file downloads in real-time</p>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                {/* Spot Counters info */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block uppercase">PRE-FILLED AMOUNT</span>
                    <span className="text-xl font-extrabold text-slate-900">₦3,000 <span className="text-sm line-through text-slate-400 font-normal">₦15,000</span></span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-orange-600 font-bold block uppercase">HURRY! ONLY</span>
                    <span className="text-sm font-black text-red-605 text-red-600">{spotsLeft} Spots Remaining</span>
                  </div>
                </div>

                <form onSubmit={handleModalSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={modalName}
                        onChange={(e) => setModalName(e.target.value)}
                        placeholder="e.g. Tunde Shola"
                        className="w-full h-13 px-4 rounded-xl border-2 border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 font-medium text-base transition-colors bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-705 text-slate-700 uppercase tracking-wider block">
                      Active Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={modalEmail}
                        onChange={(e) => setModalEmail(e.target.value)}
                        placeholder="e.g. shola@gmail.com"
                        className="w-full h-13 px-4 rounded-xl border-2 border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 font-medium text-base transition-colors bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={modalIsLoading}
                    className="w-full h-14 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-red-200 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {modalIsLoading ? "Securing Token Info..." : "CLAIM DISCOUNT DISPATCH NOW"}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </form>

                <div className="flex justify-center items-center gap-3 text-slate-400 text-2xs pt-1">
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-500" /> Secure Checkout Gateway</span>
                  <span>•</span>
                  <span>Direct Delivery</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

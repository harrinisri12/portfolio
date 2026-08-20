export const projectsData = [
  {
    id: "medical-vision-ai",
    title: "MedVision: AI-Powered Chest X-Ray Diagnostic Suite",
    description: "An end-to-end full-stack computer vision application that assists radiologists by automatically segmenting and identifying anomalies in chest radiographs using deep learning models.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    technologies: ["React", "Python", "Flask", "PyTorch", "Supabase", "Tailwind CSS"],
    githubUrl: "https://github.com/harrinisri12/medvision-ai",
    liveUrl: "https://medvision-ai-demo.vercel.app",
    featured: true,
    
    // Detailed Narrative Fields
    problem: "Radiologists in understaffed clinics face immense workloads, resulting in diagnostic backlogs and delayed patient care. There is an urgent need for intelligent, automated screening tools that can quickly prioritize scans showing critical abnormalities like pneumonia, cardiomegaly, or pneumothorax.",
    solution: "MedVision is a web-based PACS (Picture Archiving and Communication System) companion. It uses a custom-trained PyTorch CNN backend to analyze uploaded DICOM/PNG X-ray images, returning anomaly probability maps and heatmaps showing where the model detected signs of disease. The frontend is built on React with Framer Motion, while Supabase stores medical metadata, image paths, and doctor feedback.",
    features: [
      "Instant DICOM/PNG uploads with metadata parsing (patient age, sex, scanner specs).",
      "Real-time heatmaps indicating structural anomalies using Grad-CAM.",
      "Dual-pane comparison layout allowing doctors to contrast original scans with model segmentations.",
      "Auditable diagnosis logs with feedback flags directly connected to Supabase Database.",
      "Secure patient profiles protected by Supabase Row Level Security (RLS)."
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    ],
    developmentProcess: "The application development was split into two stages. First, I prepared and trained a DenseNet121 model on the NIH Chest X-Ray dataset. Once the model hit an AUC of 0.89, I built a Flask REST API wrapper. The second stage involved crafting a highly polished, responsive React dashboard that handles canvas-based image zooming, custom filters for adjusting contrast/brightness, and Supabase client integrations.",
    challenges: "Handling raw DICOM files in browser environments was difficult due to file sizes and proprietary medical encodings. I resolved this by designing an asynchronous serverless pipeline: the raw file uploads directly to Supabase Storage, triggering a parser that converts the scan to web-friendly WebP formats while extracting metadata, thus bypassing local heavy processing.",
    results: "MedVision provides a diagnostic tool with a sub-2-second inference latency, speeding up initial review times. The application shows the value of combining modern full-stack web technologies with AI models to optimize clinical tasks."
  },
  {
    id: "collaborative-kanban",
    title: "SyncFlow: Real-time Multi-User Kanban Workspace",
    description: "A serverless, interactive project management platform featuring drag-and-drop actions, live presence cursors, and instant updates across connected clients using Supabase Realtime.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Tailwind CSS", "Supabase Realtime", "Lucide React", "Framer Motion"],
    githubUrl: "https://github.com/harrinisri12/syncflow-kanban",
    liveUrl: "https://syncflow-kanban.vercel.app",
    featured: false,
    
    problem: "Traditional project management tools are heavy and often separate messaging from updates, leading to version conflicts when team members edit boards simultaneously without live visual updates.",
    solution: "SyncFlow delivers a fast project boarding experience. By leveraging Supabase's PostgreSQL Replication and Realtime channels, board changes (moving cards, editing descriptions, adding checklists) are broadcasted to all active users in under 100ms. It also integrates real-time cursor presence to display where team members are looking.",
    features: [
      "Multi-board workspaces with drag-and-drop list and card reorganizations.",
      "Live cursor tracking displaying other collaborators' profiles.",
      "Rich card editor supporting checklist items, markdown descriptions, and tag markers.",
      "Database status caching supporting offline editing and automatic reconnection syncing.",
      "Custom workspace invites backed by email authentication."
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
    ],
    developmentProcess: "I chose React and Framer Motion's layout animations to build smooth transition card shifts. The database layer uses Supabase tables for workspaces, boards, lists, cards, and profiles. Supabase Broadcast and Presence channels track active users and send live mouse coordinates without cluttering standard database writes.",
    challenges: "The primary challenge was managing cursor tracking frequency to prevent network congestion. I solved this by implementing high-performance throttle loops (30ms limit) and using compact relative screen percentage coordinates.",
    results: "Created a smooth project tool that behaves like a native desktop app, demonstrating how serverless WebSockets can support interactive collaborative experiences."
  },
  {
    id: "sustainable-marketplace",
    title: "EcoEco: Peer-to-Peer Green Commerce Platform",
    description: "A clean, sustainable marketplace connecting local consumers with eco-friendly creators, supporting smart geo-filtering, stripe payments, and seller verification workflows.",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Vite", "Node.js", "PostgreSQL", "Supabase Storage", "Tailwind CSS"],
    githubUrl: "https://github.com/harrinisri12/ecoeco-marketplace",
    liveUrl: "https://ecoeco-marketplace.vercel.app",
    featured: false,
    
    problem: "Finding verified zero-waste or organic products locally is difficult due to greenwashing and fragmentation among small-scale eco-conscious creators who lack professional online storefronts.",
    solution: "EcoEco provides a unified platform where creators go through a carbon-offset checklist to gain a verification badge. Users can search for organic produce, hand-made items, or clean clothing, with direct filtering by distance and delivery options.",
    features: [
      "Seller application dashboard with Supabase Storage upload for validation documents.",
      "Interactive map search integrating local postal coordinates.",
      "Full catalog management supporting variations (size, color, weight).",
      "Stripe integration with support for split merchant payouts.",
      "Comprehensive product reviews and buyer verification tags."
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80"
    ],
    developmentProcess: "I built the app with a modular component architecture. Sellers upload high-res item photos directly to a public Supabase Storage bucket, optimized client-side using canvas resize pre-processors. The geo-searching utilizes PostgreSQL PostGIS extension functions through Supabase RPCs.",
    challenges: "PostGIS coordinate mapping query optimization on Postgres was challenging. I resolved this by indexing coordinates with gist indexes, cutting query times for active listings down to less than 15ms.",
    results: "EcoEco demonstrates a clean e-commerce system that combines geographic searches, Stripe webhooks, and secure storage to connect sustainable local communities."
  }
];

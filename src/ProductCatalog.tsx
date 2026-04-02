import React, { useState, useEffect } from 'react';
import {
  Content,
  Grid,
  Column,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabList,
  Tab,
  Theme,
  ContentSwitcher,
  Switch,
} from '@carbon/react';
import {
  Code,
  Cube,
  CloudApp,
  DataBase,
  VirtualMachine,
  Locked,
} from '@carbon/icons-react';
import ChatField from './components/ChatField';
import ProductCard from './components/ProductCard';
import AllProductsView from './components/AllProductsView';
import './ProductCatalog.scss';

const ProductCatalog: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedView, setSelectedView] = useState(0);
  const [productCounts, setProductCounts] = useState<{[key: string]: number}>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setProductCounts({}); // Reset counts when search changes
  };

  // Calculate total search results
  const searchResultCount = Object.values(productCounts).reduce((sum, count) => sum + count, 0);

  // Create a callback that updates the count for a specific card
  const createResultCountHandler = (cardId: string) => (count: number) => {
    setProductCounts(prev => ({
      ...prev,
      [cardId]: count
    }));
  };

  return (
    <Content id="main-content">
      <div className="product-catalog-page">
        {/* Page Header */}
        <Theme theme="white">
          <div className={`page-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="page-header-content">
            <Grid fullWidth narrow>
              <Column lg={16} md={8} sm={4}>
                <div className={`header-top-content ${isScrolled ? 'hidden' : ''}`}>
                  <Breadcrumb noTrailingSlash>
                    <BreadcrumbItem href="#">Home</BreadcrumbItem>
                    <BreadcrumbItem href="#" isCurrentPage>Product catalog</BreadcrumbItem>
                  </Breadcrumb>
                  <div className="page-title-section">
                    <h1 className="page-title">Product catalog</h1>
                    <p className="page-description">
                      Browse our catalog of IBM Cloud products and services
                    </p>
                  </div>
                </div>
                
                <div className="catalog-chat-field">
                  <ChatField
                    placeholder="Search for products or tell us your use case"
                    labelText="Product Catalog Search"
                    id="catalog-ai-chat"
                    onChange={handleSearchChange}
                    onKeyDown={() => {}}
                    onSend={() => {}}
                    onVoiceInput={() => {}}
                  />
                </div>
                
                {/* Tabs */}
                <div className="catalog-tabs">
                  <Tabs selectedIndex={selectedTab} onChange={(e: any) => setSelectedTab(e.selectedIndex)}>
                    <TabList aria-label="Catalog tabs">
                      <Tab>Explore</Tab>
                      <Tab>All products</Tab>
                      <Tab>Pricing</Tab>
                      <Tab>Documentation</Tab>
                      <Tab>Deployable Architectures</Tab>
                      <Tab>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          My Catalog
                          <Locked size={16} />
                        </span>
                      </Tab>
                    </TabList>
                  </Tabs>
                </div>
              </Column>
            </Grid>
            </div>
          </div>
        </Theme>

        {/* Page Content */}
        <div className="page-content">
          <Grid fullWidth narrow>
            {selectedTab === 0 && (
              <>
                {searchQuery ? (
                  <Column lg={16} md={8} sm={4}>
                    <h2 className="section-heading">
                      Search results for "{searchQuery}" ({searchResultCount})
                    </h2>
                  </Column>
                ) : (
                  <>
                    <Column lg={16} md={8} sm={4}>
                      <h2 className="section-heading">Explore solutions</h2>
                    </Column>
                    <Column lg={4} md={4} sm={4}>
                      <div className="content-switcher-wrapper">
                        <ContentSwitcher
                          selectedIndex={selectedView}
                          onChange={(e: any) => setSelectedView(e.index)}
                          size="md"
                        >
                          <Switch name="use-case" text="View by use case" />
                          <Switch name="hubs" text="View by hubs" />
                        </ContentSwitcher>
                      </div>
                    </Column>
                  </>
                )}
                {selectedView === 0 && (
                  <>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="Containers and kubernetes"
                    description="Run websites, apps, and APIs with global scale and no server management."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('containers-kubernetes')}
                    products={[
                      {
                        name: "Code Engine",
                        description: "Run apps and containers serverlessly.",
                        icon: Code
                      },
                      {
                        name: "Containers",
                        description: "Secure, highly available containers on OpenShift or Kubernetes.",
                        icon: Cube
                      },
                      {
                        name: "Cloudant",
                        description: "Scalable JSON database for modern apps.",
                        icon: CloudApp
                      },
                      {
                        name: "Prisma Cloud Compute Edition - BYOL",
                        description: "Cloud-native security for hosts and containers.",
                        icon: DataBase
                      },
                      {
                        name: "Bare Metal Servers for VPC",
                        description: "Single-tenant x86 servers for end-user virtualization.",
                        icon: VirtualMachine
                      },
                      {
                        name: "Virtual Server for VPC",
                        description: "High-performance next-gen virtual machines.",
                        icon: VirtualMachine
                      },
                      {
                        name: "Open VPN Access Server",
                        description: "Secure remote access with OpenVPN.",
                        icon: DataBase
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="Virtual machines and legacy workloads"
                    description="Run virtual machines on IBM Cloud"
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('virtual-machines')}
                    products={[
                      {
                        name: "Virtual Server for VPC",
                        description: "High-performance next-gen virtual machines.",
                        icon: VirtualMachine
                      },
                      {
                        name: "Virtual Server for Classic",
                        description: "Single-tenant x86 servers at all locations.",
                        icon: VirtualMachine
                      },
                      {
                        name: "Bare Metal Servers for VPC",
                        description: "Single-tenant x86 servers for end-user virtualization.",
                        icon: VirtualMachine
                      },
                      {
                        name: "Bare Metal Servers for Classic",
                        description: "Dedicated physical servers with full control.",
                        icon: VirtualMachine
                      },
                      {
                        name: "Power Virtual Server",
                        description: "IBM Power Systems virtual machines.",
                        icon: VirtualMachine
                      },
                      {
                        name: "Power Virtual Server for SAP HANA",
                        description: "Optimized Power Systems for SAP workloads.",
                        icon: VirtualMachine
                      },
                      {
                        name: "VMware Solutions",
                        description: "Run VMware workloads on IBM Cloud.",
                        icon: VirtualMachine
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="AI, machine learning and GPU workloads"
                    description="watsonx accelerates generative AI in core workflows to boost productivity."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('ai-ml-gpu')}
                    products={[
                      {
                        name: "watsonx.ai",
                        description: "Build, train, and deploy AI models at scale.",
                        icon: CloudApp
                      },
                      {
                        name: "watsonx.data",
                        description: "Open lakehouse for AI workloads.",
                        icon: DataBase
                      },
                      {
                        name: "watsonx.governance",
                        description: "Govern AI models and data.",
                        icon: CloudApp
                      },
                      {
                        name: "Watson Studio",
                        description: "Build and train AI models collaboratively.",
                        icon: CloudApp
                      },
                      {
                        name: "Watson Machine Learning",
                        description: "Deploy and manage ML models.",
                        icon: CloudApp
                      },
                      {
                        name: "GPU Virtual Servers",
                        description: "High-performance GPU instances for AI workloads.",
                        icon: VirtualMachine
                      },
                      {
                        name: "Watson Discovery",
                        description: "AI-powered search and text analytics.",
                        icon: CloudApp
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="Hosting"
                    description="Host applications and websites"
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('hosting')}
                    products={[
                      {
                        name: "Code Engine",
                        description: "Run apps and containers serverlessly.",
                        icon: Code
                      },
                      {
                        name: "Cloud Foundry",
                        description: "Platform as a service for cloud applications.",
                        icon: CloudApp
                      },
                      {
                        name: "Virtual Server for VPC",
                        description: "High-performance next-gen virtual machines.",
                        icon: VirtualMachine
                      },
                      {
                        name: "Bare Metal Servers",
                        description: "Dedicated physical servers for hosting.",
                        icon: VirtualMachine
                      },
                      {
                        name: "Content Delivery Network",
                        description: "Global content delivery and caching.",
                        icon: CloudApp
                      },
                      {
                        name: "Internet Services",
                        description: "DNS, DDoS protection, and load balancing.",
                        icon: CloudApp
                      },
                      {
                        name: "Load Balancer for VPC",
                        description: "Distribute traffic across multiple instances.",
                        icon: CloudApp
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="Data storage and backup"
                    description="Enterprise storage for backup and archive."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('data-storage-backup')}
                    products={[
                      {
                        name: "Cloud Object Storage",
                        description: "Scalable, secure object storage for unstructured data.",
                        icon: DataBase
                      },
                      {
                        name: "Block Storage for VPC",
                        description: "High-performance block storage volumes for VPC instances.",
                        icon: DataBase
                      },
                      {
                        name: "File Storage for VPC",
                        description: "Shared file storage for VPC workloads.",
                        icon: DataBase
                      },
                      {
                        name: "Backup for VPC",
                        description: "Automated backup service for VPC resources.",
                        icon: DataBase
                      },
                      {
                        name: "Mass Data Migration",
                        description: "Physical data transfer service for large datasets.",
                        icon: DataBase
                      },
                      {
                        name: "Cloud Backup",
                        description: "Enterprise backup solution for hybrid cloud.",
                        icon: DataBase
                      },
                      {
                        name: "Archive Storage",
                        description: "Long-term data archival with low-cost storage.",
                        icon: DataBase
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="Databases and analytics"
                    description="IBM managed database services"
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('databases-analytics')}
                    products={[
                      {
                        name: "Db2",
                        description: "Enterprise-grade relational database.",
                        icon: DataBase
                      },
                      {
                        name: "Cloudant",
                        description: "Scalable JSON database for modern apps.",
                        icon: DataBase
                      },
                      {
                        name: "Databases for PostgreSQL",
                        description: "Managed PostgreSQL database service.",
                        icon: DataBase
                      },
                      {
                        name: "Databases for MySQL",
                        description: "Managed MySQL database service.",
                        icon: DataBase
                      },
                      {
                        name: "Databases for MongoDB",
                        description: "Managed MongoDB database service.",
                        icon: DataBase
                      },
                      {
                        name: "Databases for Redis",
                        description: "Managed Redis in-memory data store.",
                        icon: DataBase
                      },
                      {
                        name: "Data Virtualization",
                        description: "Query data across multiple sources.",
                        icon: DataBase
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="Disaster recovery and high availability"
                    description="Backup, monitor, and restore IBM Cloud workloads."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('disaster-recovery')}
                    products={[
                      {
                        name: "Backup for VPC",
                        description: "Automated backup service for VPC resources.",
                        icon: DataBase
                      },
                      {
                        name: "Cloud Backup",
                        description: "Enterprise backup solution for hybrid cloud.",
                        icon: DataBase
                      },
                      {
                        name: "Veeam Backup & Replication",
                        description: "Comprehensive backup and recovery solution.",
                        icon: DataBase
                      },
                      {
                        name: "Zerto",
                        description: "Continuous data protection and disaster recovery.",
                        icon: DataBase
                      },
                      {
                        name: "IBM Cloud Monitoring",
                        description: "Monitor infrastructure and application health.",
                        icon: CloudApp
                      },
                      {
                        name: "Activity Tracker",
                        description: "Track and audit account activity.",
                        icon: CloudApp
                      },
                      {
                        name: "High Availability Clusters",
                        description: "Automated failover for critical workloads.",
                        icon: CloudApp
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="SaaS and managed platforms"
                    description="Always-updated SaaS apps—no infrastructure to manage."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('saas-platforms')}
                    products={[
                      {
                        name: "App Connect",
                        description: "Integration platform as a service.",
                        icon: CloudApp
                      },
                      {
                        name: "API Connect",
                        description: "Create, secure, and manage APIs.",
                        icon: CloudApp
                      },
                      {
                        name: "Event Streams",
                        description: "Managed Apache Kafka service.",
                        icon: CloudApp
                      },
                      {
                        name: "MQ",
                        description: "Enterprise messaging service.",
                        icon: CloudApp
                      },
                      {
                        name: "Aspera on Cloud",
                        description: "High-speed file transfer service.",
                        icon: CloudApp
                      },
                      {
                        name: "Cognos Analytics",
                        description: "Business intelligence and analytics platform.",
                        icon: CloudApp
                      },
                      {
                        name: "Maximo Application Suite",
                        description: "Asset management and monitoring platform.",
                        icon: CloudApp
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                  </>
                )}
                {selectedView === 1 && (
                  <>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="Containers"
                    description="Deploy and manage containerized applications with Kubernetes and OpenShift."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('containers-hub')}
                    products={[
                      {
                        name: "Red Hat OpenShift on IBM Cloud",
                        description: "Fully managed OpenShift service.",
                        icon: Cube
                      },
                      {
                        name: "Kubernetes Service",
                        description: "Managed Kubernetes clusters.",
                        icon: Cube
                      },
                      {
                        name: "Code Engine",
                        description: "Run apps and containers serverlessly.",
                        icon: Code
                      },
                      {
                        name: "Container Registry",
                        description: "Private container image registry.",
                        icon: Cube
                      },
                      {
                        name: "Satellite",
                        description: "Deploy services anywhere.",
                        icon: CloudApp
                      },
                      {
                        name: "Cloud Pak for Applications",
                        description: "Modernize applications with containers.",
                        icon: CloudApp
                      },
                      {
                        name: "Instana Observability",
                        description: "Application performance monitoring.",
                        icon: CloudApp
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="Infrastructure"
                    description="Compute, storage, and networking resources for your workloads."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('infrastructure-hub')}
                    products={[
                      {
                        name: "Virtual Server for VPC",
                        description: "High-performance virtual machines.",
                        icon: VirtualMachine
                      },
                      {
                        name: "Bare Metal Servers",
                        description: "Dedicated physical servers.",
                        icon: VirtualMachine
                      },
                      {
                        name: "Power Virtual Server",
                        description: "IBM Power Systems virtual machines.",
                        icon: VirtualMachine
                      },
                      {
                        name: "VPC Infrastructure",
                        description: "Isolated virtual network infrastructure.",
                        icon: CloudApp
                      },
                      {
                        name: "Cloud Object Storage",
                        description: "Scalable object storage.",
                        icon: DataBase
                      },
                      {
                        name: "Block Storage for VPC",
                        description: "High-performance block storage.",
                        icon: DataBase
                      },
                      {
                        name: "Load Balancer for VPC",
                        description: "Distribute traffic across instances.",
                        icon: CloudApp
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="Databases"
                    description="Managed database services for your applications."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('databases-hub')}
                    products={[
                      {
                        name: "Db2",
                        description: "Enterprise-grade relational database.",
                        icon: DataBase
                      },
                      {
                        name: "Cloudant",
                        description: "Scalable JSON database.",
                        icon: DataBase
                      },
                      {
                        name: "Databases for PostgreSQL",
                        description: "Managed PostgreSQL service.",
                        icon: DataBase
                      },
                      {
                        name: "Databases for MySQL",
                        description: "Managed MySQL service.",
                        icon: DataBase
                      },
                      {
                        name: "Databases for MongoDB",
                        description: "Managed MongoDB service.",
                        icon: DataBase
                      },
                      {
                        name: "Databases for Redis",
                        description: "Managed Redis in-memory store.",
                        icon: DataBase
                      },
                      {
                        name: "Databases for Elasticsearch",
                        description: "Managed Elasticsearch service.",
                        icon: DataBase
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="Observability"
                    description="Monitor, log, and trace your applications and infrastructure."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('observability-hub')}
                    products={[
                      {
                        name: "IBM Cloud Monitoring",
                        description: "Monitor infrastructure and applications.",
                        icon: CloudApp
                      },
                      {
                        name: "IBM Cloud Logs",
                        description: "Centralized logging service.",
                        icon: CloudApp
                      },
                      {
                        name: "Activity Tracker",
                        description: "Track and audit account activity.",
                        icon: CloudApp
                      },
                      {
                        name: "Instana Observability",
                        description: "Application performance monitoring.",
                        icon: CloudApp
                      },
                      {
                        name: "Log Analysis",
                        description: "Search and analyze logs.",
                        icon: CloudApp
                      },
                      {
                        name: "Cloud Monitoring with Sysdig",
                        description: "Container and Kubernetes monitoring.",
                        icon: CloudApp
                      },
                      {
                        name: "Event Notifications",
                        description: "Route events to notification channels.",
                        icon: CloudApp
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="Platform Automation"
                    description="Automate infrastructure provisioning and application deployment."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('platform-automation-hub')}
                    products={[
                      {
                        name: "Schematics",
                        description: "Infrastructure as code with Terraform.",
                        icon: Code
                      },
                      {
                        name: "Continuous Delivery",
                        description: "DevOps toolchain service.",
                        icon: CloudApp
                      },
                      {
                        name: "Toolchain",
                        description: "Integrated DevOps tools.",
                        icon: CloudApp
                      },
                      {
                        name: "Projects",
                        description: "Manage infrastructure deployments.",
                        icon: CloudApp
                      },
                      {
                        name: "Catalog Management",
                        description: "Manage private catalogs.",
                        icon: CloudApp
                      },
                      {
                        name: "Event Streams",
                        description: "Managed Apache Kafka service.",
                        icon: CloudApp
                      },
                      {
                        name: "App Configuration",
                        description: "Centralized feature flag management.",
                        icon: CloudApp
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="Security"
                    description="Protect your data and applications with enterprise security."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('security-hub')}
                    products={[
                      {
                        name: "Security and Compliance Center",
                        description: "Manage security and compliance posture.",
                        icon: CloudApp
                      },
                      {
                        name: "Key Protect",
                        description: "Encryption key management service.",
                        icon: CloudApp
                      },
                      {
                        name: "Secrets Manager",
                        description: "Centralized secrets management.",
                        icon: CloudApp
                      },
                      {
                        name: "Hyper Protect Crypto Services",
                        description: "FIPS 140-2 Level 4 HSM service.",
                        icon: CloudApp
                      },
                      {
                        name: "Certificate Manager",
                        description: "SSL/TLS certificate management.",
                        icon: CloudApp
                      },
                      {
                        name: "App ID",
                        description: "Authentication and user management.",
                        icon: CloudApp
                      },
                      {
                        name: "Cloud Internet Services",
                        description: "DDoS protection and WAF.",
                        icon: CloudApp
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="API Management"
                    description="Create, secure, and manage APIs at scale."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('api-management-hub')}
                    products={[
                      {
                        name: "API Connect",
                        description: "Create, secure, and manage APIs.",
                        icon: CloudApp
                      },
                      {
                        name: "App Connect",
                        description: "Integration platform as a service.",
                        icon: CloudApp
                      },
                      {
                        name: "Event Streams",
                        description: "Managed Apache Kafka service.",
                        icon: CloudApp
                      },
                      {
                        name: "MQ",
                        description: "Enterprise messaging service.",
                        icon: CloudApp
                      },
                      {
                        name: "API Gateway",
                        description: "Secure and manage API traffic.",
                        icon: CloudApp
                      },
                      {
                        name: "Event Endpoint Management",
                        description: "Manage event-driven architectures.",
                        icon: CloudApp
                      },
                      {
                        name: "DataPower Gateway",
                        description: "Security and integration gateway.",
                        icon: CloudApp
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="Backup and Recovery"
                    description="Protect and recover your data and workloads."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('backup-recovery-hub')}
                    products={[
                      {
                        name: "Backup for VPC",
                        description: "Automated backup for VPC resources.",
                        icon: DataBase
                      },
                      {
                        name: "Cloud Backup",
                        description: "Enterprise backup solution.",
                        icon: DataBase
                      },
                      {
                        name: "Veeam Backup & Replication",
                        description: "Comprehensive backup solution.",
                        icon: DataBase
                      },
                      {
                        name: "Zerto",
                        description: "Continuous data protection.",
                        icon: DataBase
                      },
                      {
                        name: "IBM Storage Protect",
                        description: "Enterprise data protection.",
                        icon: DataBase
                      },
                      {
                        name: "Snapshots for VPC",
                        description: "Point-in-time volume snapshots.",
                        icon: DataBase
                      },
                      {
                        name: "Cloud Object Storage",
                        description: "Durable object storage for backups.",
                        icon: DataBase
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="Cloud Pak for Data"
                    description="Unified data and AI platform for modernizing analytics."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('cloud-pak-data-hub')}
                    products={[
                      {
                        name: "Cloud Pak for Data",
                        description: "Unified data and AI platform.",
                        icon: CloudApp
                      },
                      {
                        name: "Watson Studio",
                        description: "Build and train AI models.",
                        icon: CloudApp
                      },
                      {
                        name: "Watson Machine Learning",
                        description: "Deploy and manage ML models.",
                        icon: CloudApp
                      },
                      {
                        name: "Watson Knowledge Catalog",
                        description: "Data governance and catalog.",
                        icon: DataBase
                      },
                      {
                        name: "DataStage",
                        description: "ETL and data integration.",
                        icon: DataBase
                      },
                      {
                        name: "Db2 Warehouse",
                        description: "Cloud data warehouse.",
                        icon: DataBase
                      },
                      {
                        name: "Cognos Analytics",
                        description: "Business intelligence platform.",
                        icon: CloudApp
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="Partner Center"
                    description="Build, publish, and sell solutions on IBM Cloud."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('partner-center-hub')}
                    products={[
                      {
                        name: "Partner Center",
                        description: "Manage partner offerings.",
                        icon: CloudApp
                      },
                      {
                        name: "Catalog Management",
                        description: "Publish to IBM Cloud catalog.",
                        icon: CloudApp
                      },
                      {
                        name: "Usage Reports",
                        description: "Track customer usage.",
                        icon: CloudApp
                      },
                      {
                        name: "Billing and Invoicing",
                        description: "Manage partner billing.",
                        icon: CloudApp
                      },
                      {
                        name: "Marketplace",
                        description: "Discover partner solutions.",
                        icon: CloudApp
                      },
                      {
                        name: "Terraform Provider",
                        description: "Automate infrastructure deployment.",
                        icon: Code
                      },
                      {
                        name: "API Documentation",
                        description: "Developer resources and APIs.",
                        icon: CloudApp
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="SAP"
                    description="Run SAP workloads on IBM Cloud infrastructure."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('sap-hub')}
                    products={[
                      {
                        name: "Power Virtual Server for SAP HANA",
                        description: "Optimized Power Systems for SAP.",
                        icon: VirtualMachine
                      },
                      {
                        name: "Bare Metal Servers for SAP",
                        description: "Certified servers for SAP workloads.",
                        icon: VirtualMachine
                      },
                      {
                        name: "Virtual Server for SAP",
                        description: "Virtual machines for SAP applications.",
                        icon: VirtualMachine
                      },
                      {
                        name: "SAP HANA on Power",
                        description: "In-memory database on Power Systems.",
                        icon: DataBase
                      },
                      {
                        name: "SAP NetWeaver",
                        description: "Application server platform.",
                        icon: CloudApp
                      },
                      {
                        name: "SAP S/4HANA",
                        description: "Next-generation ERP suite.",
                        icon: CloudApp
                      },
                      {
                        name: "SAP Business One",
                        description: "ERP for small businesses.",
                        icon: CloudApp
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="Satellite"
                    description="Deploy IBM Cloud services anywhere - on-premises, edge, or other clouds."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('satellite-hub')}
                    products={[
                      {
                        name: "Satellite",
                        description: "Deploy services anywhere.",
                        icon: CloudApp
                      },
                      {
                        name: "Satellite Locations",
                        description: "Manage distributed locations.",
                        icon: CloudApp
                      },
                      {
                        name: "Red Hat OpenShift on Satellite",
                        description: "Kubernetes anywhere.",
                        icon: Cube
                      },
                      {
                        name: "Satellite Storage",
                        description: "Persistent storage for Satellite.",
                        icon: DataBase
                      },
                      {
                        name: "Satellite Link",
                        description: "Secure connectivity to locations.",
                        icon: CloudApp
                      },
                      {
                        name: "Satellite Config",
                        description: "Configuration management.",
                        icon: CloudApp
                      },
                      {
                        name: "Edge Application Manager",
                        description: "Manage edge workloads.",
                        icon: CloudApp
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                <Column lg={16} md={8} sm={4}>
                  <ProductCard
                    title="watsonx"
                    description="AI and data platform for building and scaling AI models."
                    searchQuery={searchQuery}
                    onResultCount={createResultCountHandler('watsonx-hub')}
                    products={[
                      {
                        name: "watsonx.ai",
                        description: "Build, train, and deploy AI models.",
                        icon: CloudApp
                      },
                      {
                        name: "watsonx.data",
                        description: "Open lakehouse for AI workloads.",
                        icon: DataBase
                      },
                      {
                        name: "watsonx.governance",
                        description: "Govern AI models and data.",
                        icon: CloudApp
                      },
                      {
                        name: "Watson Assistant",
                        description: "Build conversational AI.",
                        icon: CloudApp
                      },
                      {
                        name: "Watson Discovery",
                        description: "AI-powered search and analytics.",
                        icon: CloudApp
                      },
                      {
                        name: "Watson Studio",
                        description: "Collaborative AI development.",
                        icon: CloudApp
                      },
                      {
                        name: "Watson Machine Learning",
                        description: "Deploy and manage ML models.",
                        icon: CloudApp
                      }
                    ]}
                    moreText="View 10 more"
                  />
                </Column>
                  </>
                )}
              </>
            )}
            {selectedTab === 1 && (
              <AllProductsView />
            )}
          </Grid>
        </div>
      </div>
    </Content>
  );
};

export default ProductCatalog;

// Made with Bob

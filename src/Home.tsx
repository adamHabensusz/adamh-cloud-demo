import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Content,
  Tile,
  Button,
  Link,
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Modal,
  TextInput,
  Form,
  Stack,
  Grid,
  Column,
  Tag,
  Search,
  IconButton,
} from '@carbon/react';
import {
  Cube,
  Code,
  WatsonHealth3DCursor,
  Gateway,
  DataBase,
  VirtualMachine,
  Network_3,
  WarningAlt,
  Misuse,
  Edit,
  OverflowMenuVertical,
  Add,
  ChevronRight,
  CaretDown,
  InProgress,
  Activity,
  Catalog,
  Deploy,
  Document,
  Settings,
  Renew,
  Pin,
  AiLaunch,
} from '@carbon/icons-react';
import ChatField from './components/ChatField';

interface Resource {
  id: string;
  name: string;
  group: string;
  location: string;
  product: string;
  productIcon: React.ReactNode;
  status: 'running' | 'failed' | 'warning';
}

interface HomeProps {
  userName: string;
  setUserName: (name: string) => void;
  accountId: string;
  setAccountId: (id: string) => void;
  accountName: string;
  setAccountName: (name: string) => void;
  onOpenAiPanel?: () => void;
  onOpenChat?: (chatId: string) => void;
}

const Home: React.FC<HomeProps> = ({
  userName,
  setUserName,
  accountId,
  setAccountId,
  accountName,
  setAccountName,
  onOpenAiPanel,
  onOpenChat,
}) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempUserName, setTempUserName] = useState(userName);
  const [tempAccountId, setTempAccountId] = useState(accountId);
  const [tempAccountName, setTempAccountName] = useState(accountName);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isEditPinnedModalOpen, setIsEditPinnedModalOpen] = useState(false);

  // Resource list data
  const allResources: Resource[] = [
    {
      id: '1',
      name: 'vsi-prod-web-01',
      group: 'default',
      location: 'us-south-1',
      product: 'Virtual Server Instances',
      productIcon: <VirtualMachine size={20} />,
      status: 'running',
    },
    {
      id: '2',
      name: 'vpc-network-prod',
      group: 'default',
      location: 'us-south-2',
      product: 'Virtual Server Instances',
      productIcon: <VirtualMachine size={20} />,
      status: 'failed',
    },
    {
      id: '3',
      name: 'vsi-dev-sandbox-03',
      group: 'staging',
      location: 'eu-de-1',
      product: 'Virtual Server Instances',
      productIcon: <VirtualMachine size={20} />,
      status: 'running',
    },
    {
      id: '4',
      name: 'cos-media-assets',
      group: 'production',
      location: 'us-east-1',
      product: 'Cloud Object Storage',
      productIcon: <DataBase size={20} />,
      status: 'running',
    },
    {
      id: '5',
      name: 'cos-migration-store',
      group: 'default',
      location: 'us-south-3',
      product: 'Cloud Object Storage',
      productIcon: <DataBase size={20} />,
      status: 'failed',
    },
    {
      id: '6',
      name: 'cos-backup-archive',
      group: 'default',
      location: 'us-south-1',
      product: 'Cloud Object Storage',
      productIcon: <DataBase size={20} />,
      status: 'running',
    },
    {
      id: '7',
      name: 'fn-data-processor',
      group: 'default',
      location: 'us-south-3',
      product: 'Serverless',
      productIcon: <Code size={20} />,
      status: 'warning',
    },
    {
      id: '8',
      name: 'fn-event-handler',
      group: 'production',
      location: 'us-south-1',
      product: 'Serverless',
      productIcon: <Code size={20} />,
      status: 'running',
    },
    {
      id: '9',
      name: 'fn-api-gateway',
      group: 'default',
      location: 'eu-de-1',
      product: 'Serverless',
      productIcon: <Code size={20} />,
      status: 'running',
    },
    {
      id: '10',
      name: 'iks-prod-cluster-01',
      group: 'default',
      location: 'us-south-1',
      product: 'Clusters',
      productIcon: <Network_3 size={20} />,
      status: 'running',
    },
    {
      id: '11',
      name: 'iks-staging-cluster-02',
      group: 'staging',
      location: 'eu-de-1',
      product: 'Clusters',
      productIcon: <Network_3 size={20} />,
      status: 'running',
    },
    {
      id: '12',
      name: 'iks-dev-cluster-03',
      group: 'default',
      location: 'us-south-2',
      product: 'Clusters',
      productIcon: <Network_3 size={20} />,
      status: 'running',
    },
    {
      id: '13',
      name: 'log-prod-us-south',
      group: 'observability',
      location: 'us-south-1',
      product: 'Logging instances',
      productIcon: <Activity size={20} />,
      status: 'running',
    },
    {
      id: '14',
      name: 'log-staging-eu-de',
      group: 'staging',
      location: 'eu-de-1',
      product: 'Logging instances',
      productIcon: <Activity size={20} />,
      status: 'running',
    },
    {
      id: '15',
      name: 'log-dev-analytics',
      group: 'analytics',
      location: 'us-south-2',
      product: 'Logging instances',
      productIcon: <Activity size={20} />,
      status: 'running',
    },
    {
      id: '16',
      name: 'mon-prod-infra',
      group: 'observability',
      location: 'us-south-1',
      product: 'Monitoring instances',
      productIcon: <Activity size={20} />,
      status: 'running',
    },
    {
      id: '17',
      name: 'mon-app-performance',
      group: 'production',
      location: 'us-south-2',
      product: 'Monitoring instances',
      productIcon: <Activity size={20} />,
      status: 'running',
    },
    {
      id: '18',
      name: 'mon-network-health',
      group: 'default',
      location: 'us-south-3',
      product: 'Monitoring instances',
      productIcon: <Activity size={20} />,
      status: 'running',
    },
    {
      id: '19',
      name: 'db-prod-postgres-01',
      group: 'production',
      location: 'us-south-1',
      product: 'Databases',
      productIcon: <DataBase size={20} />,
      status: 'running',
    },
    {
      id: '20',
      name: 'db-analytics-mysql',
      group: 'analytics',
      location: 'eu-de-1',
      product: 'Databases',
      productIcon: <DataBase size={20} />,
      status: 'running',
    },
  ];

  // Get 8 random resources
  const getRandomResources = (resources: Resource[], count: number): Resource[] => {
    const shuffled = [...resources].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const [recentlyVisited] = useState<Resource[]>(() => getRandomResources(allResources, 8));

  const handleFilterToggle = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleOpenEditPinnedModal = () => {
    setIsEditPinnedModalOpen(true);
  };

  const handleCloseEditPinnedModal = () => {
    setIsEditPinnedModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setTempUserName(userName);
    setTempAccountId(accountId);
    setTempAccountName(accountName);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = () => {
    setUserName(tempUserName);
    setAccountId(tempAccountId);
    setAccountName(tempAccountName);
    setIsEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  return (
    <Content id="main-content">
      <div className="dashboard-container">
        {/* Welcome Section */}
        <div className="welcome-section-wrapper">
          <div className="welcome-section">
            <div className="welcome-content">
            <Grid fullWidth narrow>
              <Column lg={16} md={8} sm={4}>
                <div className="welcome-header-new">
                  <div className="welcome-left">
                    <p className="welcome-text">Welcome,</p>
                    <div className="user-name-container">
                      <h1 className="user-name">{userName}</h1>
                      <Button
                        kind="ghost"
                        size="sm"
                        renderIcon={Edit}
                        iconDescription="Edit name"
                        hasIconOnly
                        onClick={handleOpenEditModal}
                      />
                    </div>
                  </div>
                  <div className="status-cards-horizontal">
                    <div className="status-card-inline">
                      <span className="status-label">Issues</span>
                      <div className="status-value-inline">
                        <Misuse size={20} style={{ color: '#da1e28' }} />
                        <span className="status-number">2</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                    <div className="status-card-inline">
                      <span className="status-label">Cloud incidents</span>
                      <div className="status-value-inline">
                        <WarningAlt size={20} style={{ color: '#f1c21b' }} />
                        <span className="status-number">2</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                    <div className="status-card-inline">
                      <span className="status-label">Maintenance</span>
                      <div className="status-value-inline">
                        <span className="status-number">2</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </Column>

              {/* AI Search */}
              <Column lg={8} md={8} sm={4}>
                <div className="ai-search-container">
                  <ChatField
                    placeholder="Ask anything"
                    labelText="AI Search"
                    id="ai-search"
                    onChange={() => {}}
                    onKeyDown={() => {}}
                    onSend={() => {}}
                    onVoiceInput={() => {}}
                  />
                </div>
              </Column>
            </Grid>

            {/* Information Cards Row */}
            <Grid fullWidth narrow>
              <Column lg={4} md={4} sm={4}>
                <div className="info-card">
                  <h3 className="card-title">New feature</h3>
                  <p className="card-description">
                    IBM Cloud is now AI-first. Run an AI task with your IBM Cloud account.
                  </p>
                  <Link href="#">Learn more</Link>
                </div>
              </Column>
              <Column lg={4} md={4} sm={4}>
                <div className="info-card">
                  <h3 className="card-title">Available promotions</h3>
                  <p className="card-description">
                    Get 60% off your Virtual Server for VPC for 12 months
                  </p>
                  <Link href="#">View promotions</Link>
                </div>
              </Column>
              <Column lg={4} md={4} sm={4}>
                <div className="info-card">
                  <h3 className="card-title">Latest news</h3>
                  <p className="card-description">
                    IBM Elects Ramon L. Laguarta to Its Board of Directors
                  </p>
                  <Link href="#">View all news</Link>
                </div>
              </Column>
              <Column lg={4} md={4} sm={4}>
                <div className="info-card">
                  <h3 className="card-title">Learning</h3>
                  <p className="card-description">
                    Explore essential features for creating your virtual server on IBM Cloud VPC.
                  </p>
                  <Link href="#">Explore</Link>
                </div>
              </Column>
            </Grid>
          </div>
        </div>
      </div>

        {/* Page Content Container */}
        <div className="page-content">
          <Grid fullWidth narrow>
            {/* Shortcuts Section */}
            <Column lg={16} md={8} sm={4}>
              <div className="shortcuts-section">
                <h2 className="section-title">Shortcuts</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Tag
                      type={selectedFilter === 'all' ? 'high-contrast' : 'outline'}
                      onClick={() => handleFilterToggle('all')}
                      style={{ cursor: 'pointer' }}
                    >
                      Getting started
                    </Tag>
                    <Tag
                      type={selectedFilter === 'pinned' ? 'high-contrast' : 'outline'}
                      onClick={() => handleFilterToggle('pinned')}
                      style={{ cursor: 'pointer' }}
                    >
                      Pinned (4)
                    </Tag>
                    <Tag
                      type={selectedFilter === 'products' ? 'high-contrast' : 'outline'}
                      onClick={() => handleFilterToggle('products')}
                      style={{ cursor: 'pointer' }}
                    >
                      My products (16)
                    </Tag>
                  </div>
                  {selectedFilter === 'pinned' && (
                    <Button
                      kind="ghost"
                      size="sm"
                      renderIcon={Edit}
                      iconDescription="Edit list"
                      onClick={handleOpenEditPinnedModal}
                    >
                      Edit list
                    </Button>
                  )}
                </div>
              </div>
            </Column>
            
            {selectedFilter === 'all' && (
              <>
                <Column lg={4} md={4} sm={4}>
                  <Tile className="getting-started-tile">
                    <Cube size={24} className="tile-icon" />
                    <h3 className="tile-title">Create your first resource</h3>
                    <p className="tile-description">
                      Resources are on-demand services created and managed in the cloud.
                    </p>
                  </Tile>
                </Column>
                <Column lg={4} md={4} sm={4}>
                  <Tile className="getting-started-tile">
                    <Catalog size={24} className="tile-icon" />
                    <h3 className="tile-title">Explore our product catalog</h3>
                    <p className="tile-description">
                      Discover our industry leading products and solutions.
                    </p>
                  </Tile>
                </Column>
                <Column lg={4} md={4} sm={4}>
                  <Tile className="getting-started-tile">
                    <Deploy size={24} className="tile-icon" />
                    <h3 className="tile-title">Deploy deployable architectures</h3>
                    <p className="tile-description">
                      Explore pre-built compositions of products that work together.
                    </p>
                  </Tile>
                </Column>
                <Column lg={4} md={4} sm={4}>
                  <Tile className="getting-started-tile">
                    <Document size={24} className="tile-icon" />
                    <h3 className="tile-title">IBM Cloud documentation</h3>
                    <p className="tile-description">
                      Visit the IBM Cloud Docs page to help you get started in the right direction.
                    </p>
                  </Tile>
                </Column>
              </>
            )}

            {selectedFilter === 'pinned' && (
              <>
                <Column lg={4} md={4} sm={4}>
                  <Tile className="getting-started-tile">
                    <Settings size={24} className="tile-icon" />
                    <h3 className="tile-title">Billing and usage</h3>
                    <p className="tile-description">
                      
                    </p>
                  </Tile>
                </Column>
                <Column lg={4} md={4} sm={4}>
                  <Tile className="getting-started-tile">
                    <Settings size={24} className="tile-icon" />
                    <h3 className="tile-title">Access (IAM)</h3>
                    <p className="tile-description">
                      
                    </p>
                  </Tile>
                </Column>
                <Column lg={4} md={4} sm={4}>
                  <Tile className="getting-started-tile">
                    <Renew size={24} className="tile-icon" />
                    <h3 className="tile-title">cluster01</h3>
                    <p className="tile-description">
                      Working nodes
                    </p>
                  </Tile>
                </Column>
                <Column lg={4} md={4} sm={4}>
                  <Tile className="getting-started-tile">
                    <Renew size={24} className="tile-icon" />
                    <h3 className="tile-title">cluster0115</h3>
                    <p className="tile-description">
                      Ingress
                    </p>
                  </Tile>
                </Column>
              </>
            )}

            {selectedFilter === 'products' && (
              <>
                <Column lg={2} md={2} sm={2}>
              <Tile className="shortcut-tile">
                <Cube size={24} />
                <div className="shortcut-info">
                  <span className="shortcut-name">Containers</span>
                  <span className="shortcut-count">5 resources</span>
                </div>
              </Tile>
            </Column>
            <Column lg={2} md={2} sm={2}>
              <Tile className="shortcut-tile">
                <Code size={24} />
                <div className="shortcut-info">
                  <span className="shortcut-name">Code Engine</span>
                  <span className="shortcut-count">5 resources</span>
                </div>
              </Tile>
            </Column>
            <Column lg={2} md={2} sm={2}>
              <Tile className="shortcut-tile">
                <WatsonHealth3DCursor size={24} />
                <div className="shortcut-info">
                  <span className="shortcut-name">watsonx</span>
                  <span className="shortcut-count">5 resources</span>
                </div>
              </Tile>
            </Column>
            <Column lg={2} md={2} sm={2}>
              <Tile className="shortcut-tile">
                <Gateway size={24} />
                <div className="shortcut-info">
                  <span className="shortcut-name">Transit Gateway</span>
                  <span className="shortcut-count">5 resources</span>
                </div>
              </Tile>
            </Column>
            <Column lg={2} md={2} sm={2}>
              <Tile className="shortcut-tile">
                <DataBase size={24} />
                <div className="shortcut-info">
                  <span className="shortcut-name">Block Storage for VPC</span>
                  <span className="shortcut-count">5 resources</span>
                </div>
              </Tile>
            </Column>
            <Column lg={2} md={2} sm={2}>
              <Tile className="shortcut-tile">
                <DataBase size={24} />
                <div className="shortcut-info">
                  <span className="shortcut-name">Databases</span>
                  <span className="shortcut-count">5 resources</span>
                </div>
              </Tile>
            </Column>
            <Column lg={2} md={2} sm={2}>
              <Tile className="shortcut-tile">
                <VirtualMachine size={24} />
                <div className="shortcut-info">
                  <span className="shortcut-name">File Storage for VPC</span>
                  <span className="shortcut-count">5 resources</span>
                </div>
              </Tile>
            </Column>
            <Column lg={2} md={2} sm={2}>
              <Tile className="shortcut-tile">
                <Network_3 size={24} />
                <div className="shortcut-info">
                  <span className="shortcut-name">VMware Solutions</span>
                  <span className="shortcut-count">5 resources</span>
                </div>
              </Tile>
            </Column>
              </>
            )}

            {/* Main Content Grid */}
            <Column lg={16} md={8} sm={4}>
              <h2 className="jump-back-in-title">Jump back in</h2>
            </Column>

            {/* Recently Visited */}
            <Column lg={12} md={8} sm={4}>
              <div className="recently-visited">
                <div className="section-header">
                  <h2 className="section-title">Recently visited</h2>
                  <div className="section-header-actions">
                    <Button
                      kind="ghost"
                      size="lg"
                      renderIcon={Add}
                      onClick={() => navigate('/catalog')}
                    >
                      Create
                    </Button>
                    <Button
                      kind="ghost"
                      size="lg"
                      renderIcon={OverflowMenuVertical}
                      iconDescription="View all"
                      hasIconOnly
                    />
                  </div>
                </div>
                <StructuredListWrapper>
                  <StructuredListBody>
                    {recentlyVisited.map((resource) => (
                      <StructuredListRow
                        key={resource.id}
                        onClick={() => navigate(`/resources/${resource.name}`)}
                        style={{ cursor: 'pointer' }}
                      >
                        <StructuredListCell>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {resource.productIcon}
                            <span>{resource.name}</span>
                          </div>
                        </StructuredListCell>
                        <StructuredListCell>{resource.product}</StructuredListCell>
                        <StructuredListCell style={{ width: '48px' }}>
                          <ChevronRight size={16} />
                        </StructuredListCell>
                      </StructuredListRow>
                    ))}
                  </StructuredListBody>
                </StructuredListWrapper>
                <div className="card-footer">
                  <Link href="#" onClick={(e) => { e.preventDefault(); navigate('/resources'); }}>View all resources</Link>
                </div>
              </div>
            </Column>

            {/* Recent Chats */}
            <Column lg={4} md={8} sm={4}>
              <div className="recent-chats">
                <div className="section-header">
                  <h2 className="section-title">Recent chats</h2>
                  <div className="section-header-actions">
                    <Button
                      kind="ghost"
                      size="lg"
                      renderIcon={AiLaunch}
                      onClick={onOpenAiPanel}
                    >
                      New chat
                    </Button>
                    <Button
                      kind="ghost"
                      size="lg"
                      renderIcon={OverflowMenuVertical}
                      iconDescription="More options"
                      hasIconOnly
                    />
                  </div>
                </div>
                <StructuredListWrapper>
                  <StructuredListBody>
                    <StructuredListRow
                      onClick={() => onOpenChat?.('chat-1')}
                      style={{ cursor: 'pointer' }}
                    >
                      <StructuredListCell>Compare resource distribution</StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow
                      onClick={() => onOpenChat?.('chat-2')}
                      style={{ cursor: 'pointer' }}
                    >
                      <StructuredListCell>Timeline of performance degradation</StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow
                      onClick={() => onOpenChat?.('chat-3')}
                      style={{ cursor: 'pointer' }}
                    >
                      <StructuredListCell>Generate a billing anomaly report</StructuredListCell>
                    </StructuredListRow>
                  </StructuredListBody>
                </StructuredListWrapper>
                <div className="card-footer">
                  <Link href="#">View all chats</Link>
                </div>
              </div>
            </Column>

            {/* Control Center Section */}
            <Column lg={16} md={8} sm={4}>
              <h2 className="control-center-title">Control center</h2>
            </Column>

            {/* Month-to-date usage */}
            <Column lg={8} md={8} sm={4}>
              <div className="control-card">
                <div className="control-card-header">
                  <h3 className="control-card-title">Month-to-date usage</h3>
                  <div className="control-card-actions">
                    <Button kind="ghost" size="lg" renderIcon={Add} iconDescription="Add" hasIconOnly />
                    <Button kind="ghost" size="lg" renderIcon={OverflowMenuVertical} iconDescription="More options" hasIconOnly />
                  </div>
                </div>
                <div className="control-card-content">
                  <div className="usage-amount">
                    <CaretDown size={20} style={{ color: '#24a148' }} />
                    <span className="amount">$1,258.58</span>
                    <span className="period">/month</span>
                  </div>
                  <div className="chart-placeholder">
                    <svg width="100%" height="120" viewBox="0 0 700 120" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#a6c8ff', stopOpacity: 0.4 }} />
                          <stop offset="100%" style={{ stopColor: '#a6c8ff', stopOpacity: 0 }} />
                        </linearGradient>
                      </defs>
                      <path d="M 0,80 L 50,75 L 100,78 L 150,70 L 200,65 L 250,40 L 300,25 L 350,15 L 400,30 L 450,45 L 500,50 L 550,55 L 600,60 L 650,65 L 700,70 L 700,120 L 0,120 Z" fill="url(#areaGradient)" />
                      <path d="M 0,80 L 50,75 L 100,78 L 150,70 L 200,65 L 250,40 L 300,25 L 350,15 L 400,30 L 450,45 L 500,50 L 550,55 L 600,60 L 650,65 L 700,70" fill="none" stroke="#a6c8ff" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className="control-card-footer">
                  <Link href="#">Go to Billing and usage</Link>
                </div>
              </div>
            </Column>

            {/* Active support tickets */}
            <Column lg={4} md={8} sm={4}>
              <div className="control-card">
                <div className="control-card-header">
                  <h3 className="control-card-title">Active support tickets</h3>
                  <div className="control-card-actions">
                    <Button kind="ghost" size="lg" renderIcon={Add} iconDescription="Add" hasIconOnly />
                    <Button kind="ghost" size="lg" renderIcon={OverflowMenuVertical} iconDescription="More options" hasIconOnly />
                  </div>
                </div>
                <div className="control-card-content">
                  <div className="ticket-count">2</div>
                </div>
                <StructuredListWrapper>
                  <StructuredListBody>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <InProgress size={16} style={{ color: '#0043ce' }} />
                          <span>Severity 4: Order tracking for BM classic</span>
                        </div>
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <InProgress size={16} style={{ color: '#0043ce' }} />
                          <span>Severity 4: Order tracking for BM classic</span>
                        </div>
                      </StructuredListCell>
                    </StructuredListRow>
                  </StructuredListBody>
                </StructuredListWrapper>
                <div className="control-card-footer">
                  <Link href="#">Go to Support</Link>
                </div>
              </div>
            </Column>

            {/* Planned maintenance */}
            <Column lg={4} md={8} sm={4}>
              <div className="control-card">
                <div className="control-card-header">
                  <h3 className="control-card-title">Planned maintenance</h3>
                  <Button kind="ghost" size="lg" renderIcon={OverflowMenuVertical} iconDescription="More options" hasIconOnly />
                </div>
                <div className="control-card-content">
                  <div className="maintenance-count">2</div>
                </div>
                <StructuredListWrapper>
                  <StructuredListBody>
                    <StructuredListRow>
                      <StructuredListCell>Basic monitoring and bandwidth services mainten...</StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>Basic monitoring and bandwidth services mainten...</StructuredListCell>
                    </StructuredListRow>
                  </StructuredListBody>
                </StructuredListWrapper>
                <div className="control-card-footer">
                  <Link href="#">View all</Link>
                </div>
              </div>
            </Column>

            {/* Recent Activities */}
            <Column lg={16} md={8} sm={4}>
              <div className="recent-activities">
                <div className="section-header">
                  <h2 className="section-title">Recent activities</h2>
                  <div className="activities-actions">
                    <Button
                      kind="ghost"
                      size="lg"
                      renderIcon={OverflowMenuVertical}
                      iconDescription="More options"
                      hasIconOnly
                    />
                  </div>
                </div>
                <StructuredListWrapper>
                  <StructuredListBody>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Misuse size={20} style={{ color: '#da1e28' }} />
                          <span>A cluster in "Resource 1" has lost networking to an application server</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>
                        <span style={{ color: '#525252', fontSize: '0.875rem' }}>February 28, 2026 5:00 AM</span>
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Misuse size={20} style={{ color: '#da1e28' }} />
                          <span>"Resource 2" has lost connection to the server</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>
                        <span style={{ color: '#525252', fontSize: '0.875rem' }}>February 28, 2026 5:00 AM</span>
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <WarningAlt size={20} style={{ color: '#f1c21b' }} />
                          <span>Storage capacity in "Resource 3" is running low</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>
                        <span style={{ color: '#525252', fontSize: '0.875rem' }}>February 28, 2026 5:00 AM</span>
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Activity size={20} style={{ color: '#525252' }} />
                          <span>A cluster in "Resource 1" has lost networking to an application server</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>
                        <span style={{ color: '#525252', fontSize: '0.875rem' }}>February 28, 2026 5:00 AM</span>
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Activity size={20} style={{ color: '#525252' }} />
                          <span>"automate cluster creation" task has been scheduled</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>
                        <span style={{ color: '#525252', fontSize: '0.875rem' }}>February 28, 2026 5:00 AM</span>
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <InProgress size={20} style={{ color: '#0f62fe' }} />
                          <span>cluster03 is being created</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>
                        <span style={{ color: '#525252', fontSize: '0.875rem' }}>February 28, 2026 5:00 AM</span>
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <InProgress size={20} style={{ color: '#0f62fe' }} />
                          <span>cluster04 is being deleted</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>
                        <span style={{ color: '#525252', fontSize: '0.875rem' }}>February 28, 2026 5:00 AM</span>
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <InProgress size={20} style={{ color: '#0f62fe' }} />
                          <span>prod-test-tgw is being deleted</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>
                        <span style={{ color: '#525252', fontSize: '0.875rem' }}>February 28, 2026 5:00 AM</span>
                      </StructuredListCell>
                    </StructuredListRow>
                  </StructuredListBody>
                </StructuredListWrapper>
                <div className="card-footer">
                  <Link href="#">Go to Activities</Link>
                </div>
              </div>
            </Column>
          </Grid>
        </div>
      </div>

      {/* Edit Details Modal */}
      <Modal
        open={isEditModalOpen}
        onRequestClose={handleCancelEdit}
        onRequestSubmit={handleSaveChanges}
        modalHeading="Edit account details"
        modalLabel="Account Settings"
        primaryButtonText="Save changes"
        secondaryButtonText="Cancel"
        size="sm"
      >
        <Form>
          <Stack gap={6}>
            <TextInput
              id="user-name-input"
              labelText="User name"
              placeholder="Enter your name"
              value={tempUserName}
              onChange={(e) => setTempUserName(e.target.value)}
            />
            <TextInput
              id="account-id-input"
              labelText="Account ID"
              placeholder="Enter account ID"
              value={tempAccountId}
              onChange={(e) => setTempAccountId(e.target.value)}
            />
            <TextInput
              id="account-name-input"
              labelText="Account name"
              placeholder="Enter account name"
              value={tempAccountName}
              onChange={(e) => setTempAccountName(e.target.value)}
            />
          </Stack>
        </Form>
      </Modal>

      {/* Edit Pinned List Modal */}
      <Modal
        open={isEditPinnedModalOpen}
        onRequestClose={handleCloseEditPinnedModal}
        modalHeading="Edit Pinned list"
        passiveModal
        size="md"
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 400, marginBottom: '0.5rem', color: '#525252' }}>
            Add a new page
          </h4>
          <Search
            placeholder="Search for a new page to pin"
            labelText="Search"
            closeButtonLabelText="Clear search"
            size="lg"
          />
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 400, marginBottom: '1rem', color: '#525252' }}>
            Unpin an item to remove from list
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Renew size={20} />
                <span>cluster01 / Working nodes</span>
              </div>
              <IconButton
                label="Unpin"
                kind="ghost"
                size="sm"
              >
                <Pin size={16} />
              </IconButton>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Renew size={20} />
                <span>cluster0115 / Ingress</span>
              </div>
              <IconButton
                label="Unpin"
                kind="ghost"
                size="sm"
              >
                <Pin size={16} />
              </IconButton>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Settings size={20} />
                <span>Billing and usage</span>
              </div>
              <IconButton
                label="Unpin"
                kind="ghost"
                size="sm"
              >
                <Pin size={16} />
              </IconButton>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Settings size={20} />
                <span>Access (IAM)</span>
              </div>
              <IconButton
                label="Unpin"
                kind="ghost"
                size="sm"
              >
                <Pin size={16} />
              </IconButton>
            </div>
          </div>
        </div>
      </Modal>
    </Content>
  );
};

export default Home;

// Made with Bob

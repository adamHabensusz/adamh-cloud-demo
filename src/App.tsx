import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNav,
  SideNavItems,
  SideNavLink,
  Theme,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tag,
  TextArea,
  StructuredListWrapper,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '@carbon/react';
import {
  Notification,
  UserAvatar,
  Home as HomeIcon,
  Catalog,
  Activity,
  List,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Help,
  Settings,
  Menu,
  AiLaunch,
  Asleep,
  Light,
  Close,
  Upload,
  At,
  Microphone,
  SendAlt,
  Add,
} from '@carbon/icons-react';
import Home from './Home';
import ProductCatalog from './ProductCatalog';
import Create from './Create';
import Activities from './Activities';
import ResourceList from './ResourceList';
import ResourceDetails from './ResourceDetails';
import ChatField from './components/ChatField';
import './App.scss';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatHistory {
  id: string;
  title: string;
  messages: ChatMessage[];
}

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [userName, setUserName] = useState('Adam Habensusz');
  const [accountId, setAccountId] = useState('124849');
  const [accountName, setAccountName] = useState("Adam Habensusz's Account");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  // Dummy chat histories
  const chatHistories: ChatHistory[] = [
    {
      id: 'chat-1',
      title: 'Compare resource distribution',
      messages: [
        { role: 'user', content: 'Compare resource distribution' },
        { role: 'assistant', content: 'I\'ve analyzed your resource distribution across regions. Here\'s what I found:\n\n• US-East: 45% (23 resources)\n• US-West: 30% (15 resources)\n• EU-Central: 25% (13 resources)\n\nYour resources are well-distributed with a slight concentration in US-East, which aligns with your primary user base location.' },
        { role: 'user', content: 'What about cost distribution?' },
        { role: 'assistant', content: 'Cost distribution follows a similar pattern:\n\n• US-East: $567/month (42%)\n• US-West: $445/month (33%)\n• EU-Central: $335/month (25%)\n\nThe cost-per-resource ratio is consistent across regions, indicating efficient resource utilization.' }
      ]
    },
    {
      id: 'chat-2',
      title: 'Timeline of performance degradation',
      messages: [
        { role: 'user', content: 'Timeline of performance degradation' },
        { role: 'assistant', content: 'I\'ve identified a performance degradation pattern over the past 7 days:\n\n• Day 1-3: Normal performance (avg response time: 120ms)\n• Day 4-5: Slight degradation (avg response time: 180ms)\n• Day 6-7: Significant degradation (avg response time: 350ms)\n\nThe degradation correlates with increased traffic volume (+40%) and database query complexity.' },
        { role: 'user', content: 'What\'s causing this?' },
        { role: 'assistant', content: 'Root causes identified:\n\n1. Database connection pool exhaustion\n2. Unoptimized queries on the orders table\n3. Insufficient cache hit rate (dropped from 85% to 62%)\n\nRecommendations:\n• Increase connection pool size from 20 to 40\n• Add indexes on frequently queried columns\n• Implement Redis caching for hot data' }
      ]
    },
    {
      id: 'chat-3',
      title: 'Generate a billing anomaly report',
      messages: [
        { role: 'user', content: 'Generate a billing anomaly report' },
        { role: 'assistant', content: 'Billing Anomaly Report - March 2024\n\nI\'ve detected 3 anomalies in your billing:\n\n1. **Storage Spike** (March 15-18)\n   • Unexpected 300GB increase in Object Storage\n   • Cost impact: +$45\n   • Likely cause: Backup retention policy change\n\n2. **Compute Overage** (March 22)\n   • 12 hours of unplanned compute usage\n   • Cost impact: +$28\n   • Likely cause: Forgotten dev environment\n\n3. **Data Transfer** (March 25-27)\n   • 2TB outbound data transfer\n   • Cost impact: +$180\n   • Likely cause: Large dataset export' },
        { role: 'user', content: 'How can I prevent these?' },
        { role: 'assistant', content: 'Prevention strategies:\n\n1. **Storage Management**\n   • Set up lifecycle policies for automated cleanup\n   • Enable storage alerts at 80% threshold\n\n2. **Compute Optimization**\n   • Implement auto-shutdown for dev environments\n   • Use scheduled scaling policies\n\n3. **Data Transfer Control**\n   • Enable CDN caching to reduce origin requests\n   • Set up budget alerts for data transfer\n   • Review data export processes\n\nWould you like me to help implement any of these?' }
      ]
    }
  ];

  // Collapse side nav when navigating to Create page
  React.useEffect(() => {
    if (location.pathname === '/create') {
      setIsSideNavOpen(false);
    }
  }, [location.pathname]);

  // Reset scroll position to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Function to open AI panel with a specific chat
  const handleOpenChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setActiveTab(0); // Switch to Chat tab
    setIsAiPanelOpen(true); // Open the panel
  };

  return (
    <Theme theme={isDarkMode ? "g100" : "g10"}>
      <HeaderContainer
        render={() => (
          <>
            <Header aria-label="IBM Cloud">
              <Button
                kind="ghost"
                size="lg"
                renderIcon={Menu}
                iconDescription="Menu"
                hasIconOnly
                className="hamburger-menu-btn"
              />
              <HeaderName href="#" prefix="IBM">
                Cloud
              </HeaderName>
              <div className="header-nav-buttons">
                <Button
                  kind="ghost"
                  size="sm"
                  renderIcon={ChevronDown}
                  iconDescription="Account menu"
                >
                  {accountId} · User's Account
                </Button>
                <Button
                  kind="ghost"
                  size="sm"
                  renderIcon={ChevronDown}
                  iconDescription="Resources menu"
                >
                  Resources
                </Button>
              </div>
              <HeaderGlobalBar>
                <HeaderGlobalAction
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  tooltipAlignment="end"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  {isDarkMode ? <Light size={20} /> : <Asleep size={20} />}
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Help"
                  tooltipAlignment="end"
                >
                  <Help size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Settings"
                  tooltipAlignment="end"
                >
                  <Settings size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Notifications"
                  tooltipAlignment="end"
                >
                  <Notification size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="User profile"
                  tooltipAlignment="end"
                >
                  <UserAvatar size={20} />
                </HeaderGlobalAction>
                <Button
                  kind="ghost"
                  size="lg"
                  renderIcon={AiLaunch}
                  iconDescription="AI Assistant"
                  hasIconOnly
                  className="ai-button"
                  onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
                />
              </HeaderGlobalBar>
            </Header>

            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavOpen}
              isFixedNav
              href="#main-content"
            >
              <SideNavItems>
                <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <SideNavLink renderIcon={HomeIcon} isActive={location.pathname === '/'}>
                    Home
                  </SideNavLink>
                </RouterLink>
                <RouterLink to="/catalog" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <SideNavLink renderIcon={Catalog} isActive={location.pathname === '/catalog'}>
                    Product catalog
                  </SideNavLink>
                </RouterLink>
                <RouterLink to="/activities" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <SideNavLink renderIcon={Activity} isActive={location.pathname === '/activities'}>
                    Activities
                  </SideNavLink>
                </RouterLink>
                <RouterLink to="/resources" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <SideNavLink renderIcon={List} isActive={location.pathname === '/resources'}>
                    Resource list
                  </SideNavLink>
                </RouterLink>
                <div style={{
                  marginTop: 'auto',
                  padding: '1rem',
                  borderTop: '1px solid #e0e0e0',
                  display: 'flex',
                  justifyContent: isSideNavOpen ? 'flex-end' : 'center'
                }}>
                  <Button
                    kind="ghost"
                    size="sm"
                    renderIcon={isSideNavOpen ? ChevronLeft : ChevronRight}
                    iconDescription={isSideNavOpen ? "Collapse navigation" : "Expand navigation"}
                    hasIconOnly
                    onClick={() => setIsSideNavOpen(!isSideNavOpen)}
                  />
                </div>
              </SideNavItems>
            </SideNav>

            {/* AI Side Panel */}
            <Theme theme="g10" className={`ai-side-panel ${isAiPanelOpen ? 'ai-side-panel--open' : ''}`}>
              <div className="ai-side-panel-inner">
                <div className="ai-panel-header">
                  <h2 className="ai-panel-title">IBM Cloud AI</h2>
                  <div className="ai-panel-header-actions">
                    <Button
                      kind="ghost"
                      size="sm"
                      renderIcon={Add}
                      iconDescription="New chat"
                      hasIconOnly
                      onClick={() => {
                        setSelectedChatId(null);
                        setActiveTab(0);
                      }}
                    />
                    <Button
                      kind="ghost"
                      size="sm"
                      renderIcon={Close}
                      iconDescription="Close"
                      hasIconOnly
                      onClick={() => setIsAiPanelOpen(false)}
                    />
                  </div>
                </div>

                <Tabs selectedIndex={activeTab} onChange={(e) => {
                  setActiveTab(e.selectedIndex);
                  if (e.selectedIndex === 1) {
                    // Clear selected chat when switching to History tab
                    setSelectedChatId(null);
                  }
                }}>
                  <TabList aria-label="AI Panel tabs" contained>
                    <Tab>Chat</Tab>
                    <Tab>History</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <div className="ai-chat-content">
                        {selectedChatId ? (
                          <>
                            <div className="ai-chat-messages-container">
                              <div className="ai-chat-history">
                                {chatHistories.find(chat => chat.id === selectedChatId)?.messages.map((message, index) => (
                                  <div key={index} className={`ai-message ai-message--${message.role}`}>
                                    <div className="ai-message-role">{message.role === 'user' ? 'You' : 'IBM Cloud AI'}</div>
                                    <div className="ai-message-content">{message.content}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="ai-chat-input-sticky">
                              <div className="ai-chat-input-wrapper">
                                <TextArea
                                  id="ai-panel-chat"
                                  placeholder="Continue the conversation..."
                                  labelText=""
                                  hideLabel
                                  rows={3}
                                />
                                <div className="ai-chat-input-actions">
                                  <div className="ai-chat-input-actions-left">
                                    <Button
                                      kind="ghost"
                                      size="sm"
                                      renderIcon={Upload}
                                      iconDescription="Upload"
                                      hasIconOnly
                                    />
                                    <Button
                                      kind="ghost"
                                      size="sm"
                                      renderIcon={At}
                                      iconDescription="Mention"
                                      hasIconOnly
                                    />
                                  </div>
                                  <div className="ai-chat-input-actions-right">
                                    <Button
                                      kind="ghost"
                                      size="sm"
                                      renderIcon={Microphone}
                                      iconDescription="Voice input"
                                      hasIconOnly
                                    />
                                    <Button
                                      kind="ghost"
                                      size="sm"
                                      renderIcon={SendAlt}
                                      iconDescription="Send"
                                      hasIconOnly
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="ai-welcome-section">
                            <h3 className="ai-welcome-title">Run an AI task with your IBM Cloud resources.</h3>
                            
                            <div className="ai-chat-input-wrapper">
                              <TextArea
                                id="ai-panel-chat"
                                placeholder="Chat with IBM Cloud AI"
                                labelText=""
                                hideLabel
                                rows={3}
                              />
                              <div className="ai-chat-input-actions">
                                <div className="ai-chat-input-actions-left">
                                  <Button
                                    kind="ghost"
                                    size="sm"
                                    renderIcon={Upload}
                                    iconDescription="Upload"
                                    hasIconOnly
                                  />
                                  <Button
                                    kind="ghost"
                                    size="sm"
                                    renderIcon={At}
                                    iconDescription="Mention"
                                    hasIconOnly
                                  />
                                </div>
                                <div className="ai-chat-input-actions-right">
                                  <Button
                                    kind="ghost"
                                    size="sm"
                                    renderIcon={Microphone}
                                    iconDescription="Voice input"
                                    hasIconOnly
                                  />
                                  <Button
                                    kind="ghost"
                                    size="sm"
                                    renderIcon={SendAlt}
                                    iconDescription="Send"
                                    hasIconOnly
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="ai-quick-actions">
                              <div className="ai-quick-actions-header">
                                <span>Quick actions</span>
                                <span className="ai-badge">AI</span>
                              </div>
                              <div className="ai-quick-actions-list">
                                <Tag type="outline">How's my account doing?</Tag>
                                <Tag type="outline">What resources require my attention?</Tag>
                                <Tag type="outline">Estimate my monthly costs</Tag>
                                <Tag type="outline">Review recent actions</Tag>
                                <Tag type="outline">Teach me something new on IBM Cloud</Tag>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className="ai-panel-content">
                        <StructuredListWrapper>
                          <StructuredListBody>
                            {chatHistories.map((chat) => (
                              <StructuredListRow
                                key={chat.id}
                                onClick={() => {
                                  setSelectedChatId(chat.id);
                                  setActiveTab(0);
                                }}
                                style={{ cursor: 'pointer' }}
                              >
                                <StructuredListCell>{chat.title}</StructuredListCell>
                              </StructuredListRow>
                            ))}
                          </StructuredListBody>
                        </StructuredListWrapper>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>
            </Theme>

            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    userName={userName}
                    setUserName={setUserName}
                    accountId={accountId}
                    setAccountId={setAccountId}
                    accountName={accountName}
                    setAccountName={setAccountName}
                    onOpenAiPanel={() => setIsAiPanelOpen(true)}
                    onOpenChat={handleOpenChat}
                  />
                }
              />
              <Route path="/catalog" element={<ProductCatalog />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/resources" element={<ResourceList />} />
              <Route path="/resources/:resourceId" element={<ResourceDetails />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </>
        )}
      />
    </Theme>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

// Made with Bob

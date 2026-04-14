import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Content,
  Grid,
  Column,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  Link,
  Tag,
  Tile,
} from '@carbon/react';
import {
  VirtualMachine,
  DataBase,
  Network_3,
  Folder,
} from '@carbon/icons-react';
import './Activities.scss';

interface BucketData {
  name: string;
  objects: number;
  size: string;
  region: string;
  encryption: string;
}

interface ResourceDetailsData {
  id: string;
  name: string;
  group: string;
  location: string;
  product: string;
  productIcon: React.ReactNode;
  status: 'running' | 'failed' | 'warning';
  category: string;
  subcategory?: string;
  storageClass?: string;
  totalCapacity?: string;
  usedCapacity?: string;
  usedPercentage?: number;
  buckets?: BucketData[];
}

const ResourceDetails: React.FC = () => {
  const { resourceId } = useParams<{ resourceId: string }>();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  // Reset scroll position when component loads or resourceId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [resourceId]);

  // Resource data mapping
  const resourcesData: { [key: string]: ResourceDetailsData } = {
    'cos-migration-store': {
      id: '5',
      name: 'cos-migration-store',
      group: 'default',
      location: 'us-south-3',
      product: 'Cloud Object Storage',
      productIcon: <DataBase size={16} />,
      status: 'failed',
      category: 'Infrastructure',
      subcategory: 'Storage',
      storageClass: 'Standard',
      totalCapacity: '500 GB',
      usedCapacity: '487 GB',
      usedPercentage: 97,
      buckets: [
        { name: 'backup-prod-daily', objects: 1243, size: '210 GB', region: 'us-south', encryption: 'AES-256' },
        { name: 'logs-archive-2026', objects: 8432, size: '145 GB', region: 'us-south', encryption: 'AES-256' },
        { name: 'media-assets-cdn', objects: 532, size: '98 GB', region: 'us-south', encryption: 'AES-256' },
        { name: 'db-snapshots', objects: 64, size: '34 GB', region: 'us-south', encryption: 'AES-256' },
      ],
    },
    'cos-media-assets': {
      id: '4',
      name: 'cos-media-assets',
      group: 'production',
      location: 'us-east-1',
      product: 'Cloud Object Storage',
      productIcon: <DataBase size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Storage',
      storageClass: 'Standard',
      totalCapacity: '1 TB',
      usedCapacity: '756 GB',
      usedPercentage: 74,
      buckets: [
        { name: 'images-public', objects: 5621, size: '412 GB', region: 'us-east', encryption: 'AES-256' },
        { name: 'videos-streaming', objects: 892, size: '298 GB', region: 'us-east', encryption: 'AES-256' },
        { name: 'documents-cdn', objects: 234, size: '46 GB', region: 'us-east', encryption: 'AES-256' },
      ],
    },
    'cos-backup-archive': {
      id: '6',
      name: 'cos-backup-archive',
      group: 'default',
      location: 'us-south-1',
      product: 'Cloud Object Storage',
      productIcon: <DataBase size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Storage',
      storageClass: 'Cold',
      totalCapacity: '2 TB',
      usedCapacity: '1.2 TB',
      usedPercentage: 60,
      buckets: [
        { name: 'yearly-backups', objects: 156, size: '890 GB', region: 'us-south', encryption: 'AES-256' },
        { name: 'compliance-archive', objects: 423, size: '340 GB', region: 'us-south', encryption: 'AES-256' },
      ],
    },
    'vsi-prod-web-01': {
      id: '1',
      name: 'vsi-prod-web-01',
      group: 'default',
      location: 'us-south-1',
      product: 'Virtual Server Instances',
      productIcon: <VirtualMachine size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Compute',
    },
    'vpc-network-prod': {
      id: '2',
      name: 'vpc-network-prod',
      group: 'default',
      location: 'us-south-2',
      product: 'Virtual Server Instances',
      productIcon: <VirtualMachine size={16} />,
      status: 'failed',
      category: 'Infrastructure',
      subcategory: 'Compute',
    },
    'iks-prod-cluster-01': {
      id: '10',
      name: 'iks-prod-cluster-01',
      group: 'default',
      location: 'us-south-1',
      product: 'Clusters',
      productIcon: <Network_3 size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Containers',
    },
    'vsi-dev-sandbox-03': {
      id: '3',
      name: 'vsi-dev-sandbox-03',
      group: 'staging',
      location: 'eu-de-1',
      product: 'Virtual Server Instances',
      productIcon: <VirtualMachine size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Compute',
    },
    'fn-data-processor': {
      id: '7',
      name: 'fn-data-processor',
      group: 'default',
      location: 'us-south-3',
      product: 'Serverless',
      productIcon: <DataBase size={16} />,
      status: 'warning',
      category: 'Infrastructure',
      subcategory: 'Functions',
    },
    'fn-event-handler': {
      id: '8',
      name: 'fn-event-handler',
      group: 'production',
      location: 'us-south-1',
      product: 'Serverless',
      productIcon: <DataBase size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Functions',
    },
    'fn-api-gateway': {
      id: '9',
      name: 'fn-api-gateway',
      group: 'default',
      location: 'eu-de-1',
      product: 'Serverless',
      productIcon: <DataBase size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Functions',
    },
    'iks-staging-cluster-02': {
      id: '11',
      name: 'iks-staging-cluster-02',
      group: 'staging',
      location: 'eu-de-1',
      product: 'Clusters',
      productIcon: <Network_3 size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Containers',
    },
    'iks-dev-cluster-03': {
      id: '12',
      name: 'iks-dev-cluster-03',
      group: 'default',
      location: 'us-south-2',
      product: 'Clusters',
      productIcon: <Network_3 size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Containers',
    },
    'log-prod-us-south': {
      id: '13',
      name: 'log-prod-us-south',
      group: 'observability',
      location: 'us-south-1',
      product: 'Logging instances',
      productIcon: <DataBase size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Observability',
    },
    'log-staging-eu-de': {
      id: '14',
      name: 'log-staging-eu-de',
      group: 'staging',
      location: 'eu-de-1',
      product: 'Logging instances',
      productIcon: <DataBase size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Observability',
    },
    'log-dev-analytics': {
      id: '15',
      name: 'log-dev-analytics',
      group: 'analytics',
      location: 'us-south-2',
      product: 'Logging instances',
      productIcon: <DataBase size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Observability',
    },
    'mon-prod-infra': {
      id: '16',
      name: 'mon-prod-infra',
      group: 'observability',
      location: 'us-south-1',
      product: 'Monitoring instances',
      productIcon: <DataBase size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Observability',
    },
    'mon-app-performance': {
      id: '17',
      name: 'mon-app-performance',
      group: 'production',
      location: 'us-south-2',
      product: 'Monitoring instances',
      productIcon: <DataBase size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Observability',
    },
    'mon-network-health': {
      id: '18',
      name: 'mon-network-health',
      group: 'default',
      location: 'us-south-3',
      product: 'Monitoring instances',
      productIcon: <DataBase size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Observability',
    },
    'db-prod-postgres-01': {
      id: '19',
      name: 'db-prod-postgres-01',
      group: 'production',
      location: 'us-south-1',
      product: 'Databases',
      productIcon: <DataBase size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Databases',
    },
    'db-analytics-mysql': {
      id: '20',
      name: 'db-analytics-mysql',
      group: 'analytics',
      location: 'eu-de-1',
      product: 'Databases',
      productIcon: <DataBase size={16} />,
      status: 'running',
      category: 'Infrastructure',
      subcategory: 'Databases',
    },
  };

  const resource = resourcesData[resourceId || ''] || resourcesData['cos-migration-store'];

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'running':
        return <Tag type="green" size="md">Running</Tag>;
      case 'failed':
        return <Tag type="red" size="md">Failed</Tag>;
      case 'warning':
        return <Tag type="warm-gray" size="md">Warning</Tag>;
      default:
        return <Tag size="md">{status}</Tag>;
    }
  };

  const bucketHeaders = [
    { key: 'name', header: 'Bucket name' },
    { key: 'objects', header: 'Objects' },
    { key: 'size', header: 'Size' },
    { key: 'region', header: 'Region' },
    { key: 'encryption', header: 'Encryption' },
  ];

  const bucketRows = (resource.buckets || []).map((bucket, index) => ({
    id: `bucket-${index}`,
    name: <Link href="#">{bucket.name}</Link>,
    objects: bucket.objects.toLocaleString(),
    size: bucket.size,
    region: bucket.region,
    encryption: bucket.encryption,
  }));

  return (
    <Content id="main-content">
      <div className="activities-page">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-header-content">
            <Grid fullWidth narrow>
              <Column lg={16} md={8} sm={4}>
                <div className="header-top-content">
                  <Breadcrumb noTrailingSlash>
                    <BreadcrumbItem href="#" onClick={() => navigate('/')}>Home</BreadcrumbItem>
                    <BreadcrumbItem href="#">{resource.category}</BreadcrumbItem>
                    {resource.subcategory && (
                      <BreadcrumbItem href="#">{resource.subcategory}</BreadcrumbItem>
                    )}
                    <BreadcrumbItem href="#" isCurrentPage>{resource.name}</BreadcrumbItem>
                  </Breadcrumb>
                  <div className="page-title-section">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Folder size={24} />
                      <h1 className="page-title">{resource.name}</h1>
                      {getStatusTag(resource.status)}
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                {resource.buckets && (
                  <div className="activities-tabs">
                    <Tabs selectedIndex={selectedTab} onChange={(e: any) => setSelectedTab(e.selectedIndex)}>
                      <TabList aria-label="Resource tabs">
                        <Tab>Buckets</Tab>
                        <Tab>Configuration</Tab>
                      </TabList>
                    </Tabs>
                  </div>
                )}
              </Column>
            </Grid>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content">
          <Grid fullWidth narrow>
            <Column lg={16} md={8} sm={4}>
              {resource.buckets ? (
                <TabPanels>
                  <TabPanel>
                    {/* Storage Info Tiles */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                      <Tile className="resource-info-tile">
                        <div style={{ fontSize: '0.75rem', color: '#525252', marginBottom: '0.5rem' }}>
                          Storage class
                        </div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 400 }}>
                          {resource.storageClass}
                        </div>
                      </Tile>
                      <Tile className="resource-info-tile">
                        <div style={{ fontSize: '0.75rem', color: '#525252', marginBottom: '0.5rem' }}>
                          Total capacity
                        </div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 400 }}>
                          {resource.totalCapacity}
                        </div>
                      </Tile>
                      <Tile className="resource-info-tile">
                        <div style={{ fontSize: '0.75rem', color: '#525252', marginBottom: '0.5rem' }}>
                          Used capacity
                        </div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 400, color: resource.usedPercentage && resource.usedPercentage > 90 ? '#da1e28' : 'inherit' }}>
                          {resource.usedCapacity} ({resource.usedPercentage}%)
                        </div>
                      </Tile>
                    </div>

                    {/* Buckets Table */}
                    <div style={{ marginTop: '2rem' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Buckets</h3>
                      <DataTable rows={bucketRows} headers={bucketHeaders}>
                        {({
                          rows,
                          headers,
                          getHeaderProps,
                          getRowProps,
                          getTableProps,
                          getTableContainerProps,
                        }) => (
                          <TableContainer
                            {...getTableContainerProps()}
                            className="activities-table-container"
                          >
                            <Table {...getTableProps()}>
                              <TableHead>
                                <TableRow>
                                  {headers.map((header) => (
                                    <TableHeader {...getHeaderProps({ header })} key={header.key}>
                                      {header.header}
                                    </TableHeader>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows.map((row) => (
                                  <TableRow {...getRowProps({ row })} key={row.id}>
                                    {row.cells.map((cell) => (
                                      <TableCell key={cell.id}>{cell.value}</TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )}
                      </DataTable>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div style={{ padding: '2rem' }}>
                      <h3>Configuration</h3>
                      <p style={{ marginTop: '1rem', color: '#525252' }}>
                        Configuration details for {resource.name}
                      </p>
                    </div>
                  </TabPanel>
                </TabPanels>
              ) : (
                <div style={{ padding: '2rem' }}>
                  <h3>Resource Details</h3>
                  <div style={{ marginTop: '1rem' }}>
                    <p><strong>Group:</strong> {resource.group}</p>
                    <p><strong>Location:</strong> {resource.location}</p>
                    <p><strong>Product:</strong> {resource.product}</p>
                    <p><strong>Status:</strong> {resource.status}</p>
                  </div>
                </div>
              )}
            </Column>
          </Grid>
        </div>
      </div>
    </Content>
  );
};

export default ResourceDetails;

// Made with Bob

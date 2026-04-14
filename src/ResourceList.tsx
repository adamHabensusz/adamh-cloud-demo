import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Content,
  Grid,
  Column,
  Breadcrumb,
  BreadcrumbItem,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Button,
  Link,
} from '@carbon/react';
import {
  Filter,
  Download,
  Renew,
  Settings,
  TrashCan,
  VirtualMachine,
  DataBase,
  Network_3,
  CloudApp,
  ChartLineData,
  Dashboard,
  CheckmarkFilled,
  ErrorFilled,
  WarningFilled,
} from '@carbon/icons-react';
import './Activities.scss';

interface Resource {
  id: string;
  name: string;
  group: string;
  location: string;
  product: string;
  productIcon: React.ReactNode;
  status: 'running' | 'failed' | 'warning';
}

const ResourceList: React.FC = () => {
  const navigate = useNavigate();
  
  const resources: Resource[] = [
    {
      id: '1',
      name: 'vsi-prod-web-01',
      group: 'default',
      location: 'us-south-1',
      product: 'Virtual Server Instances',
      productIcon: <VirtualMachine size={16} />,
      status: 'running',
    },
    {
      id: '2',
      name: 'vpc-network-prod',
      group: 'default',
      location: 'us-south-2',
      product: 'Virtual Server Instances',
      productIcon: <VirtualMachine size={16} />,
      status: 'failed',
    },
    {
      id: '3',
      name: 'vsi-dev-sandbox-03',
      group: 'staging',
      location: 'eu-de-1',
      product: 'Virtual Server Instances',
      productIcon: <VirtualMachine size={16} />,
      status: 'running',
    },
    {
      id: '4',
      name: 'cos-media-assets',
      group: 'production',
      location: 'us-east-1',
      product: 'Cloud Object Storage',
      productIcon: <DataBase size={16} />,
      status: 'running',
    },
    {
      id: '5',
      name: 'cos-migration-store',
      group: 'default',
      location: 'us-south-3',
      product: 'Cloud Object Storage',
      productIcon: <DataBase size={16} />,
      status: 'failed',
    },
    {
      id: '6',
      name: 'cos-backup-archive',
      group: 'default',
      location: 'us-south-1',
      product: 'Cloud Object Storage',
      productIcon: <DataBase size={16} />,
      status: 'running',
    },
    {
      id: '7',
      name: 'fn-data-processor',
      group: 'default',
      location: 'us-south-3',
      product: 'Serverless',
      productIcon: <CloudApp size={16} />,
      status: 'warning',
    },
    {
      id: '8',
      name: 'fn-event-handler',
      group: 'production',
      location: 'us-south-1',
      product: 'Serverless',
      productIcon: <CloudApp size={16} />,
      status: 'running',
    },
    {
      id: '9',
      name: 'fn-api-gateway',
      group: 'default',
      location: 'eu-de-1',
      product: 'Serverless',
      productIcon: <CloudApp size={16} />,
      status: 'running',
    },
    {
      id: '10',
      name: 'iks-prod-cluster-01',
      group: 'default',
      location: 'us-south-1',
      product: 'Clusters',
      productIcon: <Network_3 size={16} />,
      status: 'running',
    },
    {
      id: '11',
      name: 'iks-staging-cluster-02',
      group: 'staging',
      location: 'eu-de-1',
      product: 'Clusters',
      productIcon: <Network_3 size={16} />,
      status: 'running',
    },
    {
      id: '12',
      name: 'iks-dev-cluster-03',
      group: 'default',
      location: 'us-south-2',
      product: 'Clusters',
      productIcon: <Network_3 size={16} />,
      status: 'running',
    },
    {
      id: '13',
      name: 'log-prod-us-south',
      group: 'observability',
      location: 'us-south-1',
      product: 'Logging instances',
      productIcon: <ChartLineData size={16} />,
      status: 'running',
    },
    {
      id: '14',
      name: 'log-staging-eu-de',
      group: 'staging',
      location: 'eu-de-1',
      product: 'Logging instances',
      productIcon: <ChartLineData size={16} />,
      status: 'running',
    },
    {
      id: '15',
      name: 'log-dev-analytics',
      group: 'analytics',
      location: 'us-south-2',
      product: 'Logging instances',
      productIcon: <ChartLineData size={16} />,
      status: 'running',
    },
    {
      id: '16',
      name: 'mon-prod-infra',
      group: 'observability',
      location: 'us-south-1',
      product: 'Monitoring instances',
      productIcon: <Dashboard size={16} />,
      status: 'running',
    },
    {
      id: '17',
      name: 'mon-app-performance',
      group: 'production',
      location: 'us-south-2',
      product: 'Monitoring instances',
      productIcon: <Dashboard size={16} />,
      status: 'running',
    },
    {
      id: '18',
      name: 'mon-network-health',
      group: 'default',
      location: 'us-south-3',
      product: 'Monitoring instances',
      productIcon: <Dashboard size={16} />,
      status: 'running',
    },
    {
      id: '19',
      name: 'db-prod-postgres-01',
      group: 'production',
      location: 'us-south-1',
      product: 'Databases',
      productIcon: <DataBase size={16} />,
      status: 'running',
    },
    {
      id: '20',
      name: 'db-analytics-mysql',
      group: 'analytics',
      location: 'eu-de-1',
      product: 'Databases',
      productIcon: <DataBase size={16} />,
      status: 'running',
    },
  ];

  const headers = [
    { key: 'name', header: 'Name' },
    { key: 'group', header: 'Group' },
    { key: 'location', header: 'Location' },
    { key: 'product', header: 'Product' },
    { key: 'status', header: 'Status' },
    { key: 'actions', header: '' },
  ];

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'running':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckmarkFilled size={16} style={{ fill: '#24a148' }} />
            <span>Running</span>
          </div>
        );
      case 'failed':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ErrorFilled size={16} style={{ fill: '#da1e28' }} />
            <span>Failed</span>
          </div>
        );
      case 'warning':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <WarningFilled size={16} style={{ fill: '#f1c21b' }} />
            <span>Warning</span>
          </div>
        );
      default:
        return <span>{status}</span>;
    }
  };

  const rows = resources.map((resource) => ({
    id: resource.id,
    name: <Link href="#" onClick={(e) => { e.preventDefault(); navigate(`/resources/${resource.name}`); }}>{resource.name}</Link>,
    group: resource.group,
    location: resource.location,
    product: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {resource.productIcon}
        <Link href="#">{resource.product}</Link>
      </div>
    ),
    status: getStatusIndicator(resource.status),
    actions: (
      <Button
        kind="ghost"
        size="sm"
        hasIconOnly
        renderIcon={TrashCan}
        iconDescription="Delete"
      />
    ),
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
                    <BreadcrumbItem href="#">Home</BreadcrumbItem>
                    <BreadcrumbItem href="#" isCurrentPage>Resource list</BreadcrumbItem>
                  </Breadcrumb>
                  <div className="page-title-section">
                    <h1 className="page-title">Resource list</h1>
                  </div>
                </div>
              </Column>
            </Grid>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content">
          <Grid fullWidth narrow>
            <Column lg={16} md={8} sm={4}>
              <DataTable rows={rows} headers={headers}>
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
                    <TableToolbar>
                      <TableToolbarContent>
                        <TableToolbarSearch
                          placeholder="Search"
                          persistent
                        />
                        <Button
                          kind="ghost"
                          renderIcon={Filter}
                          iconDescription="Filter"
                        >
                          Filter
                        </Button>
                        <Button
                          kind="ghost"
                          hasIconOnly
                          renderIcon={Download}
                          iconDescription="Download"
                        />
                        <Button
                          kind="ghost"
                          hasIconOnly
                          renderIcon={Renew}
                          iconDescription="Refresh"
                        />
                        <Button
                          kind="ghost"
                          hasIconOnly
                          renderIcon={Settings}
                          iconDescription="Settings"
                        />
                      </TableToolbarContent>
                    </TableToolbar>
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
            </Column>
          </Grid>
        </div>
      </div>
    </Content>
  );
};

export default ResourceList;

// Made with Bob

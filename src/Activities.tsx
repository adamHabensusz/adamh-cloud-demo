import React, { useState } from 'react';
import {
  Content,
  Grid,
  Column,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabList,
  Tab,
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
  Pagination,
  Link,
} from '@carbon/react';
import {
  Filter,
  Download,
  Renew,
  Settings,
  WarningAlt,
  MisuseOutline,
  Information,
} from '@carbon/icons-react';
import './Activities.scss';

interface Activity {
  id: string;
  type: string;
  severity: 'failed' | 'warning' | 'information';
  content: string;
  created: string;
  action: string;
  actionLink: string;
}

const Activities: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  const activities: Activity[] = [
    {
      id: '1',
      type: 'Incident',
      severity: 'failed',
      content: 'A cluster in "cos-migration-store" has lost networking to an application server',
      created: '5 minutes ago',
      action: 'cos-migration-store',
      actionLink: '#',
    },
    {
      id: '2',
      type: 'Incident',
      severity: 'failed',
      content: '"vpc-network-prod" has lost connection to the server',
      created: '5 minutes ago',
      action: 'vpc-network-prod',
      actionLink: '#',
    },
    {
      id: '3',
      type: 'Incident',
      severity: 'warning',
      content: 'Storage capacity in "fn-data-processor" is running low',
      created: '5 minutes ago',
      action: 'fn-data-processor',
      actionLink: '#',
    },
    {
      id: '4',
      type: 'Announcement',
      severity: 'information',
      content: 'New promotion for you',
      created: '5 minutes ago',
      action: 'Activate promotion',
      actionLink: '#',
    },
    {
      id: '5',
      type: 'Announcement',
      severity: 'information',
      content: 'New promotion for you',
      created: '24 hrs ago',
      action: 'Activate promotion',
      actionLink: '#',
    },
  ];

  const headers = [
    { key: 'type', header: 'Type' },
    { key: 'severity', header: 'Severity' },
    { key: 'content', header: 'Content' },
    { key: 'created', header: 'Created' },
    { key: 'action', header: 'Action' },
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'failed':
        return <MisuseOutline size={16} className="severity-icon severity-failed" />;
      case 'warning':
        return <WarningAlt size={16} className="severity-icon severity-warning" />;
      case 'information':
        return <Information size={16} className="severity-icon severity-information" />;
      default:
        return null;
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'failed':
        return 'Failed';
      case 'warning':
        return 'Warning';
      case 'information':
        return 'Information';
      default:
        return severity;
    }
  };

  const rows = activities.map((activity) => ({
    id: activity.id,
    type: activity.type,
    severity: (
      <div className="severity-cell">
        {getSeverityIcon(activity.severity)}
        <span>{getSeverityLabel(activity.severity)}</span>
      </div>
    ),
    content: activity.content,
    created: activity.created,
    action: <Link href={activity.actionLink}>{activity.action}</Link>,
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
                    <BreadcrumbItem href="#" isCurrentPage>Activities</BreadcrumbItem>
                  </Breadcrumb>
                  <div className="page-title-section">
                    <h1 className="page-title">Activities</h1>
                  </div>
                </div>

                {/* Tabs */}
                <div className="activities-tabs">
                  <Tabs selectedIndex={selectedTab} onChange={(e: any) => setSelectedTab(e.selectedIndex)}>
                    <TabList aria-label="Activities tabs">
                      <Tab>All (5)</Tab>
                      <Tab>Issues (3)</Tab>
                      <Tab>In-progress</Tab>
                      <Tab>Completed</Tab>
                      <Tab>Scheduled</Tab>
                    </TabList>
                  </Tabs>
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
                          placeholder="Search input text"
                          persistent
                        />
                        <Button
                          kind="ghost"
                          hasIconOnly
                          renderIcon={Filter}
                          iconDescription="Filter"
                        />
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
                            <TableHeader {...getHeaderProps({ header })}>
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow {...getRowProps({ row })}>
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id}>{cell.value}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Pagination
                      page={page}
                      pageSize={pageSize}
                      pageSizes={[10, 20, 30, 40, 50, 100]}
                      totalItems={100}
                      onChange={({ page, pageSize }) => {
                        setPage(page);
                        setPageSize(pageSize);
                      }}
                      itemsPerPageText="Items per page:"
                      pageRangeText={(current, total) => `of ${total} pages`}
                    />
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

export default Activities;

// Made with Bob

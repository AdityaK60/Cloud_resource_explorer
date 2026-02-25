import { Content, Page } from '@backstage/core-components';
import { FormSection } from './FormSection';
import { Header } from '@backstage/core-components';

export const CcdResourceExplorerPage = () => (
  <Page themeId="tool">
    <Header
            title={'CCD Resource Explorer'}
          />
    <Content>
      <FormSection />
    </Content>
  </Page>
);

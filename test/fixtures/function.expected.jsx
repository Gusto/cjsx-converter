/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import React from 'react';
import PropTypes from 'prop-types';
import { PageContainer, Alert, Form, LinkButton } from 'components/elements';

const Done = ({ title }) => (
  <PageContainer>
    <PageContainer.Header>{title}</PageContainer.Header>
    <PageContainer.Body>
      <PageContainer.FullContentPane>
        <Alert>
          <p>All Done! We'll take care of your Vermont Health Care Contribution from here.</p>
        </Alert>
        <Form.Actions className="text-center" alignForm={false}>
          <LinkButton href="/" icon="arrow-back" className="btn-primary">
            Return to Dashboard
          </LinkButton>
        </Form.Actions>
      </PageContainer.FullContentPane>
    </PageContainer.Body>
  </PageContainer>
);

Done.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Done;

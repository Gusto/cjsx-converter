/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import createReactClass from 'create-react-class';
import React from 'react';
import { PageContainer, Alert, Form, LinkButton } from 'components/elements';

const Done = createReactClass({
  render() {
    return (
      <PageContainer>
        <PageContainer.Header>
          Vermont employee health care summary
        </PageContainer.Header>
        <PageContainer.Body>
          <PageContainer.FullContentPane>
            <Alert>
              <p>
                All Done! We'll take care of your Vermont Health Care
                Contribution from here.
              </p>
            </Alert>
            <Form.Actions className='text-center' alignForm={false}>
              <LinkButton href='/' icon='arrow-back' className='btn-primary'>
                Return to Dashboard
              </LinkButton>
            </Form.Actions>
          </PageContainer.FullContentPane>
        </PageContainer.Body>
      </PageContainer>
    );
  }
});

export default Done;

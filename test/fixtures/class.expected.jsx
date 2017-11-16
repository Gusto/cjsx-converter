/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import React from 'react';
import PropTypes from 'prop-types';
import { PageContainer, Alert, Form, LinkButton } from 'components/elements';

class Done extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  componentWillMount() {
    return console.log('about to mount!');
  }

  render() {
    return (
      <PageContainer>
        <PageContainer.Header>{this.props.title}</PageContainer.Header>
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
}

export default Done;

createReactClass = require('create-react-class')
React = require('react')
PropTypes = require('prop-types')
{PageContainer, Alert, Form, LinkButton} = require('components/elements')

Done = createReactClass({
  propTypes:
    title: PropTypes.string.isRequired,

  render: ->
    <PageContainer>
      <PageContainer.Header>{this.props.title}</PageContainer.Header>
      <PageContainer.Body>
        <PageContainer.FullContentPane>
          <Alert>
            <p>
              {"All Done! We'll take care of your Vermont Health Care Contribution from here."}
            </p>
          </Alert>
          <Form.Actions className='text-center' alignForm={false}>
            <LinkButton href='/' icon='arrow-back' className='btn-primary'>Return to Dashboard</LinkButton>
          </Form.Actions>
        </PageContainer.FullContentPane>
      </PageContainer.Body>
    </PageContainer>
})

module.exports = Done

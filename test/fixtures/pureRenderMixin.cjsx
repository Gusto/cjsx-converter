createReactClass = require('create-react-class')
PureRenderMixin = require('react-addons-pure-render-mixin')
React = require('react')
{PageContainer, Alert, Form, LinkButton} = require('components/elements')

Done = createReactClass({
  mixins: [PureRenderMixin],

  render: ->
    <PageContainer>
      <PageContainer.Header>Vermont employee health care summary</PageContainer.Header>
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

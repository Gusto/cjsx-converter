React = require('react')
createReactClass = require('create-react-class')

TemplateLiteral = createReactClass
  render: ->
    something = 3
    other = 4

    <div>
      <p>
        In order to transfer your company's benefits to Gusto, you'll need to sign forms that makes us your health
        insurance broker and third-party administrator. Please make sure that you're authorized to sign contracts on
        behalf of your company.
      </p>
      <a href="/panda/maintenance_logs/#{something}">Link</a>
      <p>
        Once all the forms {something} are signed, we'll work with you and your insurance carriers to import your benefits
        information into Gusto (this can take 6-9 weeks).
      </p>
      <p>
        Testing
        <span> </span>
        {other}
      </p>
    </div>

module.exports = TemplateLiteral

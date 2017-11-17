BaseZenModel = require('backbone/prototypes/base_zen_model')
{ formatDate } = require('helpers')

class EmployeeAnniversary extends BaseZenModel
  computedAttributes: ['shortDate', 'longDate', 'href', 'isToday']

  shortDate: ->
    @get('date').toString('MM/dd')

  longDate: ->
    formatDate @get('date').toString('yyyy-MM-dd') if @get('date')?

  href: ->
    rootUrl = 'http://somesite.com/'
    "#{rootUrl}#{@get('date').toString('MMMM-d').toLowerCase()}/"

  isToday: ->
    @get('date').isToday()

module.exports = EmployeeAnniversary

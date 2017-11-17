/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import BaseZenModel from 'backbone/prototypes/base_zen_model';
import { formatDate } from 'helpers';

class EmployeeAnniversary extends BaseZenModel {
  static initClass() {
    this.prototype.computedAttributes = [
      'shortDate',
      'longDate',
      'href',
      'isToday',
    ];
  }

  shortDate() {
    return this.get('date').toString('MM/dd');
  }

  longDate() {
    if (this.get('date') != null) {
      return formatDate(this.get('date').toString('yyyy-MM-dd'));
    }
  }

  href() {
    const rootUrl = 'http://somesite.com/';
    return `${rootUrl}${this.get('date')
      .toString('MMMM-d')
      .toLowerCase()}/`;
  }

  isToday() {
    return this.get('date').isToday();
  }
}
EmployeeAnniversary.initClass();

export default EmployeeAnniversary;

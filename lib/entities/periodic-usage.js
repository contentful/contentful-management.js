import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import cloneDeep from 'lodash/cloneDeep'

/**
 * @memberof Usage
 * @typedef { "cma" | "cda" | "cpa" | "gql" } PeriodicUsageMetric
 */

/**
 * <code>dateRange</code> parameter is optional. In the absence of all or some
 * of <code>dateRange</code> properties usage period is calculated based on today's
 * date and the maximum reported data points <code>45</code>. The calculated
 * usage period is part of the response object {@link Usage.PeriodicUsage}
 *
 * @memberof Usage
 * @typedef {Object} PeriodicUsageQuery
 * @prop {string} [metric[in]="cma,gql"] - One or more periodic usage metrics
 * @prop {string} [dateRange.startAt] - Start date of usage period in <code>yyyy-mm-dd</code>
 * @prop {string} [dateRange.endAt] - End date of usage period in <code>yyyy-mm-dd</code>
 * @prop {number} [skip=0]
 * @prop {number} [limit=25]
 * @prop {string} [order="-usage"]
 */

/**
 * @memberof Usage
 * @typedef PeriodicUsage
 * @prop {string} sys.id - Periodic usage id in form of <code>usage-{metric}-{entity}-key-{key}-{startAt}-{endAt}</code>
 * @prop {"SpacePeriodicUsage" | "OrganizationPeriodicUsage"} sys.type - Periodic usage type that identifies the scope of measurement
 * @prop {Meta.Link} [sys.organization] - Organization link when <code>sys.type</code> is "OrganizationPeriodicUsage"
 * @prop {Meta.Link} [sys.space] - Space link when <code>sys.type</code> is "SpacePeriodicUsage"
 * @prop {"apiRequestsCount"} unitOfMeasure - Unit of measurement
 * @prop {Usage.PeriodicUsageMetric} metric - Type of metric
 * @prop {string} dateRange.startAt - Start date of the requested period in <code>yyyy-mm-dd</code> format
 * @prop {string} dateRange.endAt - End date of the requested period in <code>yyyy-mm-dd</code> format
 * @prop {number} usage - Usage total for the requested metric and period
 * @prop {Object} usagePerDay - Usage per day for the requested metric and period, <code>{ "yyyy-dd-mm": number, ... }</code>
 */

/**
 * @memberof Usage
 * @typedef PeriodicUsageCollection
 * @prop {number} total
 * @prop {number} limit
 * @prop {number} skip
 * @prop {string} order
 * @prop {Object<{type: "Array"}>} sys
 * @prop {Array<Usage.PeriodicUsage>} items
 * @prop {function(): Object} toPlainObject() - Returns the collection as a plain JS object
 */

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw periodic usage data collection
 * @return {Usage.PeriodicUsageCollection} Normalized periodic usage collection
 */
export function wrapPeriodicUsageCollection (http, data) {
  const usages = toPlainObject(cloneDeep(data))
  return freezeSys(usages)
}

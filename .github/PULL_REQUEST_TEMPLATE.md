<!--
Thank you for opening a pull request.

Please fill in as much of the template below as you're able. Feel free to delete
any section you want to skip.
-->

## Summary

<!-- Give a short summary what your PR is introducing/fixing. -->

## Description

<!-- Describe your changes in detail -->

## Motivation and Context

<!--
Why is this change required? What problem does it solve?
If it fixes an open issue, please link to the issue here.
-->

## Checklist (check all before merging)

- [ ] Both unit and integration tests are passing
- [ ] There are no breaking changes

When adding a new method:

- [ ] The new method is exported through the default and plain CMA client
- [ ] All new public types are exported from `./lib/export-types.ts`
- [ ] Added a unit test for the new method
- [ ] Added an integration test for the new method

# Case Study Analysis - Playwright Test Cases

## Overview
This document outlines 35+ test cases for the Case Study Analysis screen in 360 Navigator.

---

## 1. Navigation & Page Load (5 test cases)
- TC-001: Verify Case Study Analysis page loads correctly
- TC-002: Verify page title displays "Case Study Analysis"
- TC-003: Verify "Work Management" menu item is highlighted when on this page
- TC-004: Verify all left sidebar menu items are visible and clickable
- TC-005: Verify page elements load within acceptable time (< 3 seconds)

---

## 2. Site Filter & Apply Filter (5 test cases)
- TC-006: Verify Site dropdown shows available sites (PNQ, etc.)
- TC-007: Verify selecting different site updates the data
- TC-008: Verify "Apply Filter" button is present and clickable
- TC-009: Verify clicking Apply Filter refreshes the table
- TC-010: Verify filter is retained on page refresh

---

## 3. Table Functionality (10 test cases)
- TC-011: Verify table displays all columns: SITE, WORK ORDER, DESCRIPTION, DEVIATION, PRODUCTIVITY, WORK TYPE, TY
- TC-012: Verify table displays correct number of rows (1-43 of 43 items)
- TC-013: Verify clicking column header sorts data (WORK ORDER column)
- TC-014: Verify sorting toggles between ascending/descending
- TC-015: Verify sorting indicator (arrow) appears on sorted column
- TC-016: Verify table rows are clickable/selectable
- TC-017: Verify scrolling works for horizontally long tables
- TC-018: Verify table pagination shows correct item count
- TC-019: Verify data accuracy in table cells matches source
- TC-020: Verify DESCRIPTION column displays as clickable links (blue text)

---

## 4. Data Display & Values (6 test cases)
- TC-021: Verify DEVIATION column shows percentage values (0%, 100%, etc.)
- TC-022: Verify PRODUCTIVITY column shows numerical values
- TC-023: Verify WORK TYPE column shows correct types (PM, CM, etc.)
- TC-024: Verify Work Order IDs are formatted correctly (W-9704, WO-2026-00535, etc.)
- TC-025: Verify all data cells are not empty/null
- TC-026: Verify data updates when filters change

---

## 5. Donut Chart - Work Order Productivity (6 test cases)
- TC-027: Verify donut chart displays with 32.59% value
- TC-028: Verify chart legend shows "Task" and "Delay" colors
- TC-029: Verify hovering over chart shows tooltip
- TC-030: Verify chart is responsive to different screen sizes
- TC-031: Verify chart updates when data is filtered
- TC-032: Verify chart center text (32.59%) is readable and properly formatted

---

## 6. Bar Chart - Productivity by Sample Type (4 test cases)
- TC-033: Verify bar chart displays with categories: Actual, Reflected, Simulated
- TC-034: Verify bars show correct values: Actual (67), Reflected (33), Simulated (8)
- TC-035: Verify legend shows "Task" and "Delay" indicators
- TC-036: Verify chart updates when filters change

---

## 7. CM Labor Conversion Chart (4 test cases)
- TC-037: Verify bar chart displays for "CM LABOR CONVERSION NET YIELD"
- TC-038: Verify chart shows Utilization (64.14%), Productivity (32.49%), Yield (20.84%)
- TC-039: Verify Craft Count row shows 100%, 60211 hours, 28 staff
- TC-040: Verify chart colors match the legend

---

## 8. Delay Analysis - Muda 8 Wastes (5 test cases)
- TC-041: Verify horizontal bar chart displays for "DELAY ANALYSIS - MUDA 8 WASTES"
- TC-042: Verify all waste categories display: Scrap, Transportation, Skills, Defects, Overproduction, Overprocessing, Waiting, Motion, Inventory
- TC-043: Verify percentages are displayed correctly (Waiting: 24%, Motion: 33%, etc.)
- TC-044: Verify bars are color-coded consistently
- TC-045: Verify chart is horizontally scrollable if needed

---

## 9. All Delay - Minutes Chart (4 test cases)
- TC-046: Verify stacked bar chart displays for "ALL DELAY - MINUTES"
- TC-046: Verify chart shows categories: Man, Method, Materials, Management, Machine
- TC-047: Verify values display correctly (Man: 1,673, Method: 2,167, Materials: 2,077, Management: 512, Machine: 645)
- TC-048: Verify total delay calculation is correct

---

## 10. Tab Navigation (3 test cases)
- TC-049: Verify "Task Analysis" tab is present and clickable
- TC-050: Verify "Sankey" tab is present and clickable
- TC-051: Verify clicking tabs switches between different views

---

## 11. Buttons & Controls (5 test cases)
- TC-052: Verify "Toggle Graph" button is present and works
- TC-053: Verify "Reset" button clears filters and resets view
- TC-054: Verify all buttons have proper hover states
- TC-055: Verify Deviation toggle/sort button works
- TC-056: Verify X button on filter chip removes the filter

---

## 12. Responsive Design (3 test cases)
- TC-057: Verify page layout is responsive on mobile (375px width)
- TC-058: Verify page layout is responsive on tablet (768px width)
- TC-059: Verify page layout is responsive on desktop (1920px width)

---

## 13. Accessibility (4 test cases)
- TC-060: Verify all buttons are keyboard accessible (Tab navigation)
- TC-061: Verify all form inputs have proper labels
- TC-062: Verify color contrast meets WCAG standards
- TC-063: Verify screen reader compatibility

---

## 14. Error Handling (3 test cases)
- TC-064: Verify page handles empty data gracefully
- TC-065: Verify error messages display if data fails to load
- TC-066: Verify retry functionality works after load failure

---

## 15. Performance (3 test cases)
- TC-067: Verify page loads within 3 seconds
- TC-068: Verify charts render without lag
- TC-069: Verify sorting large datasets completes within 2 seconds

---

## Total: 69 Test Cases

### By Category:
- Navigation: 5
- Filters: 5
- Table: 10
- Data: 6
- Charts: 19
- Tabs: 3
- Controls: 5
- Responsive: 3
- Accessibility: 4
- Error Handling: 3
- Performance: 3

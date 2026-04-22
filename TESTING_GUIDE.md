# Comprehensive Testing Guide - Klaviyo Pricing Calculator V2

**Version:** 2.0
**Date:** April 7, 2026

---

## Testing Strategy

This guide provides comprehensive test cases for all calculator features. Test each section systematically to verify functionality.

---

## Pre-Test Setup

1. **Local Server Required** (fetch() requires HTTP/HTTPS)
   ```bash
   # Option 1: Python 3
   python3 -m http.server 8000

   # Option 2: Node.js http-server
   npx http-server -p 8000

   # Option 3: PHP
   php -S localhost:8000
   ```

2. **Open Browser**
   ```
   http://localhost:8000/index.html
   ```

3. **Open Browser Console**
   - Chrome/Edge: F12 → Console tab
   - Firefox: F12 → Console tab
   - Safari: Cmd+Opt+C

4. **Run Automated Tests**
   ```javascript
   // In browser console:
   runComprehensiveTests()
   ```

---

## Test Suite 1: Data Loading & Parsing

### Test 1.1: Markdown Data Loads Successfully
**Steps:**
1. Open browser console
2. Look for message: "Pricing data loaded: {…}"
3. Verify no errors in console

**Expected Result:**
- ✅ Data object contains: `tiers`, `coreDataInfrastructure`, `coreMessagingInfrastructure`, `addOnsComposableFeatures`, `intelligenceAIML`, `pureConsumptionModel`, `creditsModel`, `modelComparison`, `marginAnalysis`

**Pass/Fail:** ___________

---

### Test 1.2: All Tiers Present
**Steps:**
1. In console, type: `pricingData.tiers`
2. Verify 5 tiers returned

**Expected Result:**
- ✅ Free ($0)
- ✅ Starter ($49)
- ✅ Growth ($249)
- ✅ Scale ($899)
- ✅ Enterprise ($12,000)

**Pass/Fail:** ___________

---

### Test 1.3: All 24 APIs Present
**Steps:**
1. In console, type:
   ```javascript
   pricingData.coreDataInfrastructure.length +
   pricingData.coreMessagingInfrastructure.length +
   pricingData.addOnsComposableFeatures.length +
   pricingData.intelligenceAIML.length
   ```

**Expected Result:**
- ✅ Returns: 24
- ✅ Core Data: 9 APIs
- ✅ Messaging: 3 APIs
- ✅ Add-ons: 6 APIs
- ✅ Intelligence: 6 APIs

**Pass/Fail:** ___________

---

## Test Suite 2: Model 1 - Tiered Bundles

### Test 2.1: Tiered Table Renders
**Steps:**
1. Click "Model 1: Tiered Bundles" tab (should be active by default)
2. Verify large table displays

**Expected Result:**
- ✅ Table has sticky header
- ✅ First column (tier names) is sticky
- ✅ 4 layer headers: Core Data, Messaging, Add-ons, Intelligence
- ✅ 24 API columns
- ✅ 5 tier rows

**Pass/Fail:** ___________

---

### Test 2.2: Free Tier - All Fields Correct
**Steps:**
1. Locate "Free" row
2. Verify each cell

**Expected Fields:**
| API | Expected Value |
|-----|----------------|
| Profiles | ✓ 500 |
| Events | ✓ 50K/mo |
| Custom Objects | N/A |
| Lists | ✓ 5 lists |
| Tags | ✓ 10 tags |
| Webhooks | ✓ 2 webhooks |
| Web Feeds | N/A |
| Client SDK | ✓ Basic SDK |
| Metrics | ✓ Super Basic (tooltip) |
| Templates | ✓ 3 templates |
| Email Send | ✓ 500/mo |
| SMS Send | N/A |
| Segments | N/A |
| Catalogs | N/A |
| Campaigns | N/A |
| Flows | N/A |
| Forms | N/A |
| Reporting | ✓ Basic |
| All Intelligence | N/A (6 columns) |

**Pass/Fail:** ___________

---

### Test 2.3: Starter Tier - All Fields Correct
**Steps:**
1. Locate "Starter" row
2. Verify pricing: $49/mo
3. Check each API cell

**Expected Fields:**
| API | Expected Value |
|-----|----------------|
| Profiles | ✓ 10,000 |
| Events | ✓ 500K/mo |
| Custom Objects | ✓ 10K records |
| Lists | ✓ 50 lists |
| Tags | ✓ 100 tags |
| Webhooks | ✓ 10 webhooks |
| Web Feeds | ✓ 5 feeds |
| Client SDK | ✓ Full SDK |
| Metrics | ✓ Basic (tooltip) |
| Templates | ✓ 25 templates |
| Email Send | ✓ 50K/mo |
| SMS Send | ✓ 1K/mo |
| Segments | Add-on $30/mo |
| Catalogs | Add-on $25/mo |
| Campaigns | Add-on $40/mo |
| Flows | Add-on $50/mo |
| Forms | Add-on $15/mo |
| Reporting | ✓ Standard |
| All Intelligence | Coming Soon (6 columns) |

**Pass/Fail:** ___________

---

### Test 2.4: Growth Tier - All Fields Correct
**Steps:**
1. Locate "Growth" row
2. Verify pricing: $249/mo
3. Check each API cell

**Expected Fields:**
| API | Expected Value |
|-----|----------------|
| Profiles | ✓ 50,000 |
| Events | ✓ 5M/mo |
| Custom Objects | ✓ 100K records |
| Lists | ✓ 200 lists |
| Tags | ✓ 500 tags |
| Webhooks | ✓ 50 webhooks |
| Web Feeds | ✓ 20 feeds |
| Client SDK | ✓ Full SDK |
| Metrics | ✓ Advanced (tooltip) |
| Templates | ✓ 100 templates |
| Email Send | ✓ 500K/mo |
| SMS Send | ✓ 10K/mo |
| Segments | Add-on $50/mo |
| Catalogs | Add-on $75/mo |
| Campaigns | Add-on $100/mo |
| Flows | Add-on $150/mo |
| Forms | Add-on $40/mo |
| Reporting | ✓ Advanced |
| All Intelligence | Coming Soon (6 columns) |

**Pass/Fail:** ___________

---

### Test 2.5: Scale Tier - All Fields Correct
**Steps:**
1. Locate "Scale" row
2. Verify pricing: $899/mo
3. Check each API cell

**Expected Fields:**
| API | Expected Value |
|-----|----------------|
| Profiles | ✓ 250,000 |
| Events | ✓ 50M/mo |
| Custom Objects | ✓ 500K records |
| Lists | ✓ 1000 lists |
| Tags | ✓ 2000 tags |
| Webhooks | ✓ 200 webhooks |
| Web Feeds | ✓ 100 feeds |
| Client SDK | ✓ Full SDK |
| Metrics | ✓ Real-time (tooltip) |
| Templates | ✓ 500 templates |
| Email Send | ✓ 3M/mo |
| SMS Send | ✓ 50K/mo |
| Segments | Add-on $100/mo |
| Catalogs | Add-on $150/mo |
| Campaigns | Add-on $250/mo |
| Flows | Add-on $400/mo |
| Forms | Add-on $100/mo |
| Reporting | ✓ Advanced+ |
| All Intelligence | Coming Soon (6 columns) |

**Pass/Fail:** ___________

---

### Test 2.6: Enterprise Tier - All Fields Correct
**Steps:**
1. Locate "Enterprise" row
2. Verify pricing: $12,000/mo
3. Check each API cell
4. **CRITICAL:** This tier had issues in V1 - test thoroughly!

**Expected Fields:**
| API | Expected Value |
|-----|----------------|
| Profiles | ✓ Unlimited |
| Events | ✓ Unlimited |
| Custom Objects | ✓ 2M+ records |
| Lists | ✓ Unlimited |
| Tags | ✓ Unlimited |
| Webhooks | ✓ Unlimited |
| Web Feeds | ✓ Unlimited |
| Client SDK | ✓ Full SDK + Custom |
| Metrics | ✓ Enterprise (tooltip) |
| Templates | ✓ Unlimited |
| Email Send | ✓ Unlimited |
| SMS Send | ✓ Unlimited |
| Segments | ✓ Unlimited (included) |
| Catalogs | ✓ Unlimited (included) |
| Campaigns | ✓ Unlimited (included) |
| Flows | ✓ Unlimited (included) |
| Forms | ✓ Unlimited (included) |
| Reporting | ✓ Custom |
| CLV Prediction | Beta Access (tooltip) |
| Churn Prediction | Beta Access (tooltip) |
| Send Time Optimization | Beta Access (tooltip) |
| Product Recommendations | Beta Access (tooltip) |
| Predictive Segments | Beta Access (tooltip) |
| Insights AI | Beta Access (tooltip) |

**Pass/Fail:** ___________

---

### Test 2.7: Tooltips Work
**Steps:**
1. Hover over "Metrics" in Free tier
2. Verify tooltip appears

**Expected Result:**
- ✅ Tooltip shows: "Read-only dashboards, 7-day retention, daily aggregation"

**Test Other Tooltips:**
- [ ] Starter Metrics: "Daily aggregation, 30-day retention, pre-defined metrics"
- [ ] Growth Metrics: "Hourly aggregation, 90-day retention, custom metrics"
- [ ] Scale Metrics: "Streaming, 1-year retention, unlimited custom metrics"
- [ ] Enterprise Metrics: "Real-time + custom SLAs + dedicated support"
- [ ] Enterprise Intelligence APIs (6 tooltips)

**Pass/Fail:** ___________

---

## Test Suite 3: Model 2 - Pure Consumption

### Test 3.1: Consumption Model Renders
**Steps:**
1. Click "Model 2: Pure Consumption" tab
2. Verify content loads

**Expected Result:**
- ✅ Free tier section shows
- ✅ 4 pricing cards display
- ✅ All unit prices visible

**Pass/Fail:** ___________

---

### Test 3.2: Free Tier Correct
**Steps:**
1. Check free tier section

**Expected Fields:**
| Item | Expected Value |
|------|----------------|
| Profiles | 500 free (FREE badge) |
| Events | 50K/mo free (FREE badge) |
| Emails | 500/mo free (FREE badge) |
| Monthly Usage Credit | $50 (FREE badge) |

**Pass/Fail:** ___________

---

### Test 3.3: Core Data Infrastructure Pricing
**Steps:**
1. Locate "Core Data Infrastructure" card
2. Verify all prices

**Expected Prices:**
| Item | Price |
|------|-------|
| Profiles | $0.15 per 1K/month |
| Events | $12.00 per 100K |
| Custom Objects | $0.50 per 10K records/month |
| Lists | $0.10 per list/month |
| Tags | $0.01 per tag/month |
| Webhooks | $10.00 per webhook/month |
| Web Feeds | $50.00 per feed/month |

**Pass/Fail:** ___________

---

### Test 3.4: Core Messaging Infrastructure Pricing
**Steps:**
1. Locate "Core Messaging Infrastructure" card
2. Verify all prices

**Expected Prices:**
| Item | Price |
|------|-------|
| Templates | $1.00 per template/month |
| Email Send | $0.03 per 1K emails |
| SMS Send | $8.50 per 1K SMS |

**Pass/Fail:** ___________

---

### Test 3.5: Add-ons Pricing
**Steps:**
1. Locate "Add-ons (Composable Features)" card
2. Verify all prices

**Expected Prices:**
| Item | Price |
|------|-------|
| Segments | $0.13 per segment/month |
| Catalogs | $0.10 per 1K items/month |
| Campaigns | $0.05 per campaign |
| Flows | $0.10 per flow/month |
| Forms | $0.01 per form/month |

**Pass/Fail:** ___________

---

### Test 3.6: Intelligence Pricing
**Steps:**
1. Locate "Intelligence (AI/ML)" card
2. Verify all prices

**Expected Prices:**
| Item | Price |
|------|-------|
| CLV Prediction | $0.50 per prediction |
| Churn Prediction | $0.50 per prediction |
| Send Time Optimization | $0.10 per optimization |
| Product Recommendations | $0.25 per recommendation |
| Predictive Segments | $5.00 per segment/month |
| Insights AI | $1.00 per insight |

**Pass/Fail:** ___________

---

## Test Suite 4: Model 3 - Credits System

### Test 4.1: Credits Model Renders
**Steps:**
1. Click "Model 3: Credits System" tab
2. Verify content loads

**Expected Result:**
- ✅ Free credits section shows
- ✅ 4 credit packages display
- ✅ Credit costs section shows

**Pass/Fail:** ___________

---

### Test 4.2: Free Credits Correct
**Steps:**
1. Check free credits section

**Expected:**
- ✅ Monthly free credits: 50,000 credits (FREE badge)
- ✅ Description: "50,000 free credits every month (refreshes monthly)"

**Pass/Fail:** ___________

---

### Test 4.3: Credit Packages Correct
**Steps:**
1. Verify all 4 packages

**Expected Packages:**
| Package | Credits | Price | Discount | Price/Credit |
|---------|---------|-------|----------|--------------|
| Starter | 100,000 | $100 | 0% | $0.0010 |
| Growth | 500,000 | $400 | 20% OFF | $0.0008 |
| Scale | 2,000,000 | $1,400 | 30% OFF | $0.0007 |
| Enterprise | 10,000,000 | $6,000 | 40% OFF | $0.0006 |

**Pass/Fail:** ___________

---

### Test 4.4: Credit Costs - Core Data
**Steps:**
1. Scroll to "Credit Costs by Feature"
2. Check "Core Data Infrastructure" card

**Expected Credit Costs:**
| Item | Credits |
|------|---------|
| Profiles | 4 credits per profile/month |
| Events | 3.5 credits per 100 events |
| Custom Objects | 0.5 credits per record/month |
| Lists | 100 credits per list/month |
| Tags | 10 credits per tag/month |
| Webhooks | 10,000 credits per webhook/month |
| Web Feeds | 50,000 credits per feed/month |

**Pass/Fail:** ___________

---

### Test 4.5: Credit Costs - Messaging
**Steps:**
1. Check "Core Messaging Infrastructure" card

**Expected Credit Costs:**
| Item | Credits |
|------|---------|
| Templates | 1,000 credits per template/month |
| Email Send | 25 credits per email |
| SMS Send | 8,500 credits per SMS |

**Pass/Fail:** ___________

---

### Test 4.6: Credit Costs - Add-ons
**Steps:**
1. Check "Add-ons (Composable Features)" card

**Expected Credit Costs:**
| Item | Credits |
|------|---------|
| Segments | 130 credits per segment/month |
| Catalogs | 100 credits per item/month |
| Campaigns | 50 credits per campaign |
| Flows | 100 credits per flow/month |
| Forms | 10 credits per form/month |

**Pass/Fail:** ___________

---

### Test 4.7: Credit Costs - Intelligence
**Steps:**
1. Check "Intelligence (AI/ML)" card

**Expected Credit Costs:**
| Item | Credits |
|------|---------|
| CLV Prediction | 500 credits per prediction |
| Churn Prediction | 500 credits per prediction |
| Send Time Optimization | 100 credits per optimization |
| Product Recommendations | 250 credits per recommendation |
| Predictive Segments | 5,000 credits per segment/month |
| Insights AI | 1,000 credits per insight |

**Pass/Fail:** ___________

---

## Test Suite 5: Model Comparison

### Test 5.1: Comparison Table Renders
**Steps:**
1. Click "Model Comparison" tab
2. Verify table displays

**Expected Result:**
- ✅ Table with 3 model columns
- ✅ 5 dimension rows

**Pass/Fail:** ___________

---

### Test 5.2: All Dimensions Present
**Steps:**
1. Check all rows

**Expected Dimensions:**
1. [ ] Predictability
2. [ ] Cost Efficiency
3. [ ] Ease of Budgeting
4. [ ] Flexibility
5. [ ] Best For

**Pass/Fail:** ___________

---

## Test Suite 6: Revenue Modeling

### Test 6.1: Revenue Modeling Interface Renders
**Steps:**
1. Click "Revenue Modeling" tab
2. Verify interface loads

**Expected Result:**
- ✅ Customer count inputs (4 tiers: Starter, Growth, Scale, Enterprise)
- ✅ Add-on checkboxes (5 add-ons: Segments, Catalogs, Campaigns, Flows, Forms)
- ✅ Adoption rate inputs
- ✅ "Calculate Revenue & Margins" button
- ✅ Results panel (hidden initially)

**Pass/Fail:** ___________

---

### Test 6.2: Basic Calculation Test
**Steps:**
1. Enter customer counts:
   - Starter: 100
   - Growth: 50
   - Scale: 10
   - Enterprise: 2
2. Click "Calculate Revenue & Margins"

**Expected Results:**
- ✅ Total Customers: 162
- ✅ Base Revenue: $46,449/mo
- ✅ Total Monthly Revenue: $46,449
- ✅ Annual Revenue (ARR): $557,388
- ✅ Estimated Total Cost: calculated
- ✅ Gross Margin: > 50%

**Pass/Fail:** ___________

---

### Test 6.3: Add-on Calculation Test
**Steps:**
1. Same customer counts as Test 6.2
2. Check "Segments" add-on, set 50% adoption
3. Check "Catalogs" add-on, set 25% adoption
4. Click "Calculate Revenue & Margins"

**Expected Results:**
- ✅ Add-on Revenue: > $0
- ✅ Total Monthly Revenue: > Base Revenue
- ✅ Results update correctly
- ✅ Gross Margin recalculated

**Pass/Fail:** ___________

---

### Test 6.4: Zero Customer Test
**Steps:**
1. Set all customer counts to 0
2. Click "Calculate Revenue & Margins"

**Expected Results:**
- ✅ Total Customers: 0
- ✅ Base Revenue: $0
- ✅ Total Monthly Revenue: $0
- ✅ Annual Revenue: $0
- ✅ Gross Margin: 0%
- ✅ No errors in console

**Pass/Fail:** ___________

---

### Test 6.5: Large Numbers Test
**Steps:**
1. Enter customer counts:
   - Starter: 10,000
   - Growth: 5,000
   - Scale: 1,000
   - Enterprise: 100
2. Click "Calculate Revenue & Margins"

**Expected Results:**
- ✅ Calculator handles large numbers
- ✅ Numbers formatted with commas
- ✅ Calculations complete within 1 second
- ✅ No performance issues

**Pass/Fail:** ___________

---

### Test 6.6: All Add-ons Selected Test
**Steps:**
1. Enter moderate customer counts (e.g., 100/50/10/2)
2. Check ALL 5 add-on checkboxes
3. Set all adoption rates to 100%
4. Click "Calculate Revenue & Margins"

**Expected Results:**
- ✅ Add-on revenue significantly increases
- ✅ Total revenue = Base + Add-ons
- ✅ Margin remains healthy (> 60%)
- ✅ All calculations correct

**Pass/Fail:** ___________

---

## Test Suite 7: Browser Compatibility

### Test 7.1: Chrome/Edge
**Steps:**
1. Open calculator in Chrome or Edge
2. Run all tests above

**Pass/Fail:** ___________

---

### Test 7.2: Firefox
**Steps:**
1. Open calculator in Firefox
2. Run all tests above

**Pass/Fail:** ___________

---

### Test 7.3: Safari
**Steps:**
1. Open calculator in Safari
2. Run all tests above

**Pass/Fail:** ___________

---

## Test Suite 8: Responsive Design

### Test 8.1: Desktop (1920x1080)
**Steps:**
1. Set browser to full screen
2. Verify all tables display correctly
3. Check horizontal scrolling on tiered table

**Pass/Fail:** ___________

---

### Test 8.2: Laptop (1366x768)
**Steps:**
1. Resize browser to 1366x768
2. Verify all content visible
3. Check table scrolling works

**Pass/Fail:** ___________

---

### Test 8.3: Tablet (768x1024)
**Steps:**
1. Resize browser to tablet size
2. Verify mobile styles activate
3. Check tabs work on narrow screen

**Pass/Fail:** ___________

---

### Test 8.4: Mobile (375x667)
**Steps:**
1. Resize browser to mobile size
2. Verify content stacks vertically
3. Check all interactions work on small screen

**Pass/Fail:** ___________

---

## Test Suite 9: Data Integrity

### Test 9.1: Unit Cost Consistency
**Steps:**
1. In console, verify unit costs match across models:
   ```javascript
   // Profiles cost check
   const profileCostTiered = pricingData.coreDataInfrastructure[0].unitCost;
   const profileCostConsumption = pricingData.pureConsumptionModel.unitPricing.coreDataInfrastructure.profiles.price / 1000;
   const profileCostCredits = pricingData.creditsModel.creditCosts.coreDataInfrastructure.profiles.credits * 0.001 / 1000;

   console.log('Profiles - Tiered:', profileCostTiered);
   console.log('Profiles - Consumption:', profileCostConsumption);
   console.log('Profiles - Credits:', profileCostCredits);
   ```

**Expected Result:**
- ✅ All three values are similar (within 20% margin)

**Pass/Fail:** ___________

---

### Test 9.2: Tier Price Consistency
**Steps:**
1. Verify tier prices match across calculator and data:
   ```javascript
   pricingData.tiers.forEach(tier => {
       console.log(tier.name + ': $' + tier.basePrice);
   });
   ```

**Expected Result:**
- ✅ Free: $0
- ✅ Starter: $49
- ✅ Growth: $249
- ✅ Scale: $899
- ✅ Enterprise: $12,000

**Pass/Fail:** ___________

---

## Test Suite 10: Edge Cases

### Test 10.1: Negative Numbers
**Steps:**
1. In Revenue Modeling, try to enter negative customer count
2. Verify input validation

**Expected Result:**
- ✅ Input has `min="0"` attribute
- ✅ Browser prevents negative entry

**Pass/Fail:** ___________

---

### Test 10.2: Non-numeric Input
**Steps:**
1. Try to type letters in customer count fields
2. Verify validation

**Expected Result:**
- ✅ Input type="number" prevents letters
- ✅ No JavaScript errors

**Pass/Fail:** ___________

---

### Test 10.3: Very Large Numbers
**Steps:**
1. Enter customer count: 999,999,999
2. Click calculate

**Expected Result:**
- ✅ Calculator handles gracefully
- ✅ Numbers format correctly
- ✅ No overflow errors

**Pass/Fail:** ___________

---

## Summary Checklist

- [ ] All 10 test suites completed
- [ ] No console errors found
- [ ] All tiers display correctly (especially Enterprise)
- [ ] All 3 pricing models render
- [ ] Revenue modeling calculations work
- [ ] Responsive design works on all screen sizes
- [ ] Cross-browser compatible
- [ ] Data loads from markdown correctly
- [ ] Tooltips function properly
- [ ] Add-on pricing displays for all tiers

---

## Known Issues / Notes

**Date:** ___________
**Tester:** ___________

**Issues Found:**
1. ___________________________________________
2. ___________________________________________
3. ___________________________________________

**Additional Notes:**
___________________________________________
___________________________________________
___________________________________________

---

**Test Completion:** ___________
**Overall Status:** PASS / FAIL / NEEDS REVIEW

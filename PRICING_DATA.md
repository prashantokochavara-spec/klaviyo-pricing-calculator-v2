# Klaviyo Consumption Pricing Data (Backend)

This file contains all pricing data, unit costs, and configuration for the Klaviyo consumption-based pricing calculator. The HTML calculator reads from this structured data.

---

## Tier Definitions

```json
{
  "tiers": [
    {
      "id": "free",
      "name": "Free",
      "basePrice": 0,
      "description": "For individuals and small projects getting started",
      "limits": {
        "profiles": 500,
        "emails": 500,
        "sms": 0
      }
    },
    {
      "id": "starter",
      "name": "Starter",
      "basePrice": 49,
      "description": "For small businesses starting to scale",
      "limits": {
        "profiles": 10000,
        "emails": 50000,
        "sms": 1000
      }
    },
    {
      "id": "growth",
      "name": "Growth",
      "basePrice": 249,
      "description": "For growing businesses with active customers",
      "limits": {
        "profiles": 50000,
        "emails": 500000,
        "sms": 10000
      }
    },
    {
      "id": "scale",
      "name": "Scale",
      "basePrice": 899,
      "description": "For established businesses at scale",
      "limits": {
        "profiles": 250000,
        "emails": 3000000,
        "sms": 50000
      }
    },
    {
      "id": "enterprise",
      "name": "Enterprise",
      "basePrice": 12000,
      "description": "For large organizations with custom needs",
      "limits": {
        "profiles": "Unlimited",
        "emails": "Unlimited",
        "sms": "Unlimited"
      }
    }
  ]
}
```

---

## API Layer Architecture (24 APIs)

### Layer 1: Core Data Infrastructure (9 APIs)

```json
{
  "coreDataInfrastructure": [
    {
      "id": "profiles",
      "name": "Profiles",
      "status": "available",
      "unitCost": 0.00004,
      "costPer": "profile/month",
      "tierAvailability": {
        "free": {"included": true, "limit": 500, "tooltip": "Basic profile storage"},
        "starter": {"included": true, "limit": 10000, "tooltip": "Standard profile storage with basic segmentation"},
        "growth": {"included": true, "limit": 50000, "tooltip": "Advanced profile storage with custom properties"},
        "scale": {"included": true, "limit": 250000, "tooltip": "Enterprise-grade profile storage"},
        "enterprise": {"included": true, "limit": "Unlimited", "tooltip": "Unlimited profiles with dedicated infrastructure"}
      }
    },
    {
      "id": "events",
      "name": "Events",
      "status": "available",
      "unitCost": 0.000035,
      "costPer": "event",
      "tierAvailability": {
        "free": {"included": true, "limit": "50K/mo", "tooltip": "Basic event tracking"},
        "starter": {"included": true, "limit": "500K/mo", "tooltip": "Standard event tracking with retention"},
        "growth": {"included": true, "limit": "5M/mo", "tooltip": "Advanced event tracking with custom events"},
        "scale": {"included": true, "limit": "50M/mo", "tooltip": "High-volume event tracking"},
        "enterprise": {"included": true, "limit": "Unlimited", "tooltip": "Unlimited events with custom SLAs"}
      }
    },
    {
      "id": "customObjects",
      "name": "Custom Objects",
      "status": "available",
      "unitCost": 0.000005,
      "costPer": "record/month",
      "tierAvailability": {
        "free": {"included": false, "limit": "N/A"},
        "starter": {"included": true, "limit": "10K records", "tooltip": "Basic custom object storage"},
        "growth": {"included": true, "limit": "100K records", "tooltip": "Extended custom object storage"},
        "scale": {"included": true, "limit": "500K records", "tooltip": "Large-scale custom object storage"},
        "enterprise": {"included": true, "limit": "2M+ records", "tooltip": "Unlimited custom objects with custom schemas"}
      }
    },
    {
      "id": "lists",
      "name": "Lists",
      "status": "available",
      "unitCost": 0.0001,
      "costPer": "list/month",
      "tierAvailability": {
        "free": {"included": true, "limit": "5 lists", "tooltip": "Basic list management"},
        "starter": {"included": true, "limit": "50 lists", "tooltip": "Standard list management"},
        "growth": {"included": true, "limit": "200 lists", "tooltip": "Advanced list management with automation"},
        "scale": {"included": true, "limit": "1000 lists", "tooltip": "Enterprise list management"},
        "enterprise": {"included": true, "limit": "Unlimited", "tooltip": "Unlimited lists with custom logic"}
      }
    },
    {
      "id": "tags",
      "name": "Tags",
      "status": "available",
      "unitCost": 0.00001,
      "costPer": "tag/month",
      "tierAvailability": {
        "free": {"included": true, "limit": "10 tags", "tooltip": "Basic tagging"},
        "starter": {"included": true, "limit": "100 tags", "tooltip": "Standard tagging"},
        "growth": {"included": true, "limit": "500 tags", "tooltip": "Advanced tagging with hierarchies"},
        "scale": {"included": true, "limit": "2000 tags", "tooltip": "Enterprise tagging"},
        "enterprise": {"included": true, "limit": "Unlimited", "tooltip": "Unlimited tags with custom taxonomies"}
      }
    },
    {
      "id": "webhooks",
      "name": "Webhooks",
      "status": "available",
      "unitCost": 0.01,
      "costPer": "webhook/month",
      "tierAvailability": {
        "free": {"included": true, "limit": "2 webhooks", "tooltip": "Basic webhook integration"},
        "starter": {"included": true, "limit": "10 webhooks", "tooltip": "Standard webhook integration"},
        "growth": {"included": true, "limit": "50 webhooks", "tooltip": "Advanced webhook integration with retry logic"},
        "scale": {"included": true, "limit": "200 webhooks", "tooltip": "Enterprise webhook integration"},
        "enterprise": {"included": true, "limit": "Unlimited", "tooltip": "Unlimited webhooks with custom SLAs"}
      }
    },
    {
      "id": "webFeeds",
      "name": "Web Feeds",
      "status": "available",
      "unitCost": 0.05,
      "costPer": "feed/month",
      "tierAvailability": {
        "free": {"included": false, "limit": "N/A"},
        "starter": {"included": true, "limit": "5 feeds", "tooltip": "Basic RSS/Atom feeds"},
        "growth": {"included": true, "limit": "20 feeds", "tooltip": "Advanced feed management"},
        "scale": {"included": true, "limit": "100 feeds", "tooltip": "Enterprise feed management"},
        "enterprise": {"included": true, "limit": "Unlimited", "tooltip": "Unlimited feeds with custom parsing"}
      }
    },
    {
      "id": "clientSDK",
      "name": "Client SDK",
      "status": "available",
      "unitCost": 0,
      "costPer": "included",
      "tierAvailability": {
        "free": {"included": true, "limit": "Basic SDK", "tooltip": "JavaScript SDK for web tracking"},
        "starter": {"included": true, "limit": "Full SDK", "tooltip": "Web + Mobile SDKs"},
        "growth": {"included": true, "limit": "Full SDK", "tooltip": "Web + Mobile + Server SDKs"},
        "scale": {"included": true, "limit": "Full SDK", "tooltip": "All SDKs with priority support"},
        "enterprise": {"included": true, "limit": "Full SDK + Custom", "tooltip": "All SDKs with custom development"}
      }
    },
    {
      "id": "metrics",
      "name": "Metrics",
      "status": "available",
      "unitCost": 0.01,
      "costPer": "metric/month",
      "tierAvailability": {
        "free": {"included": true, "limit": "Super Basic", "tooltip": "Read-only dashboards, 7-day retention, daily aggregation"},
        "starter": {"included": true, "limit": "Basic", "tooltip": "Daily aggregation, 30-day retention, pre-defined metrics"},
        "growth": {"included": true, "limit": "Advanced", "tooltip": "Hourly aggregation, 90-day retention, custom metrics"},
        "scale": {"included": true, "limit": "Real-time", "tooltip": "Streaming, 1-year retention, unlimited custom metrics"},
        "enterprise": {"included": true, "limit": "Enterprise", "tooltip": "Real-time + custom SLAs + dedicated support"}
      }
    }
  ]
}
```

### Layer 2: Core Messaging Infrastructure (3 APIs)

```json
{
  "coreMessagingInfrastructure": [
    {
      "id": "templates",
      "name": "Templates",
      "status": "available",
      "unitCost": 0.001,
      "costPer": "template/month",
      "tierAvailability": {
        "free": {"included": true, "limit": "3 templates", "tooltip": "Basic email templates"},
        "starter": {"included": true, "limit": "25 templates", "tooltip": "Standard template library"},
        "growth": {"included": true, "limit": "100 templates", "tooltip": "Advanced template library with A/B testing"},
        "scale": {"included": true, "limit": "500 templates", "tooltip": "Enterprise template library"},
        "enterprise": {"included": true, "limit": "Unlimited", "tooltip": "Unlimited templates with custom design support"}
      }
    },
    {
      "id": "emailSend",
      "name": "Email Send",
      "status": "available",
      "unitCost": 0.000025,
      "costPer": "email",
      "tierAvailability": {
        "free": {"included": true, "limit": "500/mo", "tooltip": "Basic email sending"},
        "starter": {"included": true, "limit": "50K/mo", "tooltip": "Standard email sending"},
        "growth": {"included": true, "limit": "500K/mo", "tooltip": "High-volume email sending"},
        "scale": {"included": true, "limit": "3M/mo", "tooltip": "Enterprise email sending"},
        "enterprise": {"included": true, "limit": "Unlimited", "tooltip": "Unlimited emails with dedicated IPs"}
      }
    },
    {
      "id": "smsSend",
      "name": "SMS Send",
      "status": "available",
      "unitCost": 0.0085,
      "costPer": "SMS",
      "tierAvailability": {
        "free": {"included": false, "limit": "N/A"},
        "starter": {"included": true, "limit": "1K/mo", "tooltip": "Basic SMS sending"},
        "growth": {"included": true, "limit": "10K/mo", "tooltip": "Standard SMS sending"},
        "scale": {"included": true, "limit": "50K/mo", "tooltip": "High-volume SMS sending"},
        "enterprise": {"included": true, "limit": "Unlimited", "tooltip": "Unlimited SMS with short codes"}
      }
    }
  ]
}
```

### Layer 3: Add-ons - Composable Features (6 APIs)

```json
{
  "addOnsComposableFeatures": [
    {
      "id": "segments",
      "name": "Segments",
      "status": "available",
      "unitCost": 0.13,
      "costPer": "segment/month (30 days)",
      "tierAvailability": {
        "free": {"included": false, "limit": "N/A", "addonPrice": null},
        "starter": {"included": false, "limit": "Add-on", "addonPrice": 30, "addonLimit": "50 segments", "tooltip": "Dynamic customer segmentation"},
        "growth": {"included": false, "limit": "Add-on", "addonPrice": 50, "addonLimit": "100 segments", "tooltip": "Advanced segmentation with custom logic"},
        "scale": {"included": false, "limit": "Add-on", "addonPrice": 100, "addonLimit": "300 segments", "tooltip": "Enterprise segmentation"},
        "enterprise": {"included": true, "limit": "Unlimited", "tooltip": "Unlimited segments with custom SLAs"}
      }
    },
    {
      "id": "catalogs",
      "name": "Catalogs",
      "status": "available",
      "unitCost": 0.0001,
      "costPer": "item/month",
      "tierAvailability": {
        "free": {"included": false, "limit": "N/A", "addonPrice": null},
        "starter": {"included": false, "limit": "Add-on", "addonPrice": 25, "addonLimit": "1K items", "tooltip": "Product catalog management"},
        "growth": {"included": false, "limit": "Add-on", "addonPrice": 75, "addonLimit": "10K items", "tooltip": "Advanced catalog with custom attributes"},
        "scale": {"included": false, "limit": "Add-on", "addonPrice": 150, "addonLimit": "50K+ items", "tooltip": "Enterprise catalog management"},
        "enterprise": {"included": true, "limit": "Unlimited", "tooltip": "Unlimited catalog with custom schemas"}
      }
    },
    {
      "id": "campaigns",
      "name": "Campaigns",
      "status": "available",
      "unitCost": 0.05,
      "costPer": "campaign",
      "tierAvailability": {
        "free": {"included": false, "limit": "N/A", "addonPrice": null},
        "starter": {"included": false, "limit": "Add-on", "addonPrice": 40, "addonLimit": "10 campaigns/mo", "tooltip": "Campaign builder with scheduling"},
        "growth": {"included": false, "limit": "Add-on", "addonPrice": 100, "addonLimit": "50 campaigns/mo", "tooltip": "Advanced campaigns with A/B testing"},
        "scale": {"included": false, "limit": "Add-on", "addonPrice": 250, "addonLimit": "200 campaigns/mo", "tooltip": "Enterprise campaign management"},
        "enterprise": {"included": true, "limit": "Unlimited", "tooltip": "Unlimited campaigns with dedicated support"}
      }
    },
    {
      "id": "flows",
      "name": "Flows",
      "status": "available",
      "unitCost": 0.10,
      "costPer": "flow/month",
      "tierAvailability": {
        "free": {"included": false, "limit": "N/A", "addonPrice": null},
        "starter": {"included": false, "limit": "Add-on", "addonPrice": 50, "addonLimit": "5 flows", "tooltip": "Automated workflow builder"},
        "growth": {"included": false, "limit": "Add-on", "addonPrice": 150, "addonLimit": "20 flows", "tooltip": "Advanced flows with conditional logic"},
        "scale": {"included": false, "limit": "Add-on", "addonPrice": 400, "addonLimit": "100 flows", "tooltip": "Enterprise flow automation"},
        "enterprise": {"included": true, "limit": "Unlimited", "tooltip": "Unlimited flows with custom integrations"}
      }
    },
    {
      "id": "forms",
      "name": "Forms",
      "status": "available",
      "unitCost": 0.01,
      "costPer": "form/month",
      "tierAvailability": {
        "free": {"included": false, "limit": "N/A", "addonPrice": null},
        "starter": {"included": false, "limit": "Add-on", "addonPrice": 15, "addonLimit": "5 forms", "tooltip": "Form builder with basic customization"},
        "growth": {"included": false, "limit": "Add-on", "addonPrice": 40, "addonLimit": "10 forms", "tooltip": "Advanced forms with conditional logic"},
        "scale": {"included": false, "limit": "Add-on", "addonPrice": 100, "addonLimit": "50 forms", "tooltip": "Enterprise form management"},
        "enterprise": {"included": true, "limit": "Unlimited", "tooltip": "Unlimited forms with custom design"}
      }
    },
    {
      "id": "reporting",
      "name": "Reporting",
      "status": "available",
      "unitCost": 0,
      "costPer": "included",
      "tierAvailability": {
        "free": {"included": true, "limit": "Basic", "tooltip": "Basic reporting dashboards"},
        "starter": {"included": true, "limit": "Standard", "tooltip": "Standard reporting with exports"},
        "growth": {"included": true, "limit": "Advanced", "tooltip": "Advanced reporting with custom dashboards"},
        "scale": {"included": true, "limit": "Advanced+", "tooltip": "Advanced reporting with API access"},
        "enterprise": {"included": true, "limit": "Custom", "tooltip": "Custom reporting with BI integrations"}
      }
    }
  ]
}
```

### Layer 4: Intelligence - AI/ML (6 APIs)

```json
{
  "intelligenceAIML": [
    {
      "id": "clvPrediction",
      "name": "CLV Prediction",
      "status": "future",
      "unitCost": 0.50,
      "costPer": "prediction",
      "tierAvailability": {
        "free": {"included": false, "limit": "N/A"},
        "starter": {"included": false, "limit": "Coming Soon"},
        "growth": {"included": false, "limit": "Coming Soon"},
        "scale": {"included": false, "limit": "Coming Soon"},
        "enterprise": {"included": true, "limit": "Beta Access", "tooltip": "Predict customer lifetime value using ML"}
      }
    },
    {
      "id": "churnPrediction",
      "name": "Churn Prediction",
      "status": "future",
      "unitCost": 0.50,
      "costPer": "prediction",
      "tierAvailability": {
        "free": {"included": false, "limit": "N/A"},
        "starter": {"included": false, "limit": "Coming Soon"},
        "growth": {"included": false, "limit": "Coming Soon"},
        "scale": {"included": false, "limit": "Coming Soon"},
        "enterprise": {"included": true, "limit": "Beta Access", "tooltip": "Predict customer churn risk using ML"}
      }
    },
    {
      "id": "sendTimeOptimization",
      "name": "Send Time Optimization",
      "status": "future",
      "unitCost": 0.10,
      "costPer": "optimization",
      "tierAvailability": {
        "free": {"included": false, "limit": "N/A"},
        "starter": {"included": false, "limit": "Coming Soon"},
        "growth": {"included": false, "limit": "Coming Soon"},
        "scale": {"included": false, "limit": "Coming Soon"},
        "enterprise": {"included": true, "limit": "Beta Access", "tooltip": "Optimize send times using ML"}
      }
    },
    {
      "id": "productRecommendations",
      "name": "Product Recommendations",
      "status": "future",
      "unitCost": 0.25,
      "costPer": "recommendation",
      "tierAvailability": {
        "free": {"included": false, "limit": "N/A"},
        "starter": {"included": false, "limit": "Coming Soon"},
        "growth": {"included": false, "limit": "Coming Soon"},
        "scale": {"included": false, "limit": "Coming Soon"},
        "enterprise": {"included": true, "limit": "Beta Access", "tooltip": "AI-powered product recommendations"}
      }
    },
    {
      "id": "predictiveSegments",
      "name": "Predictive Segments",
      "status": "future",
      "unitCost": 5.00,
      "costPer": "segment/month",
      "tierAvailability": {
        "free": {"included": false, "limit": "N/A"},
        "starter": {"included": false, "limit": "Coming Soon"},
        "growth": {"included": false, "limit": "Coming Soon"},
        "scale": {"included": false, "limit": "Coming Soon"},
        "enterprise": {"included": true, "limit": "Beta Access", "tooltip": "ML-powered predictive segmentation"}
      }
    },
    {
      "id": "insightsAI",
      "name": "Insights AI",
      "status": "future",
      "unitCost": 1.00,
      "costPer": "insight",
      "tierAvailability": {
        "free": {"included": false, "limit": "N/A"},
        "starter": {"included": false, "limit": "Coming Soon"},
        "growth": {"included": false, "limit": "Coming Soon"},
        "scale": {"included": false, "limit": "Coming Soon"},
        "enterprise": {"included": true, "limit": "Beta Access", "tooltip": "LLM-powered business insights"}
      }
    }
  ]
}
```

---

## Model 2: Pure Consumption Pricing

```json
{
  "pureConsumptionModel": {
    "name": "Pure Consumption",
    "description": "Pay only for what you use, with no upfront commitment",
    "freeTier": {
      "profiles": 500,
      "events": "50K/mo",
      "emails": "500/mo",
      "usageCredit": 50,
      "description": "First $50 of usage each month is free"
    },
    "unitPricing": {
      "coreDataInfrastructure": {
        "profiles": {"price": 0.15, "unit": "per 1K/month"},
        "events": {"price": 12.00, "unit": "per 100K"},
        "customObjects": {"price": 0.50, "unit": "per 10K records/month"},
        "lists": {"price": 0.10, "unit": "per list/month"},
        "tags": {"price": 0.01, "unit": "per tag/month"},
        "webhooks": {"price": 10.00, "unit": "per webhook/month"},
        "webFeeds": {"price": 50.00, "unit": "per feed/month"}
      },
      "coreMessagingInfrastructure": {
        "templates": {"price": 1.00, "unit": "per template/month"},
        "emailSend": {"price": 0.03, "unit": "per 1K emails"},
        "smsSend": {"price": 8.50, "unit": "per 1K SMS"}
      },
      "addOnsComposableFeatures": {
        "segments": {"price": 0.13, "unit": "per segment/month"},
        "catalogs": {"price": 0.10, "unit": "per 1K items/month"},
        "campaigns": {"price": 0.05, "unit": "per campaign"},
        "flows": {"price": 0.10, "unit": "per flow/month"},
        "forms": {"price": 0.01, "unit": "per form/month"}
      },
      "intelligenceAIML": {
        "clvPrediction": {"price": 0.50, "unit": "per prediction"},
        "churnPrediction": {"price": 0.50, "unit": "per prediction"},
        "sendTimeOptimization": {"price": 0.10, "unit": "per optimization"},
        "productRecommendations": {"price": 0.25, "unit": "per recommendation"},
        "predictiveSegments": {"price": 5.00, "unit": "per segment/month"},
        "insightsAI": {"price": 1.00, "unit": "per insight"}
      }
    }
  }
}
```

---

## Model 3: Credits System

```json
{
  "creditsModel": {
    "name": "Credits System",
    "description": "Prepaid credits with volume discounts",
    "freeCredits": {
      "monthly": 50000,
      "description": "50,000 free credits every month (refreshes monthly)"
    },
    "creditPackages": [
      {
        "name": "Starter Package",
        "credits": 100000,
        "price": 100,
        "discount": "0%",
        "pricePerCredit": 0.001,
        "description": "Perfect for getting started"
      },
      {
        "name": "Growth Package",
        "credits": 500000,
        "price": 400,
        "discount": "20%",
        "pricePerCredit": 0.0008,
        "description": "20% savings vs Starter"
      },
      {
        "name": "Scale Package",
        "credits": 2000000,
        "price": 1400,
        "discount": "30%",
        "pricePerCredit": 0.0007,
        "description": "30% savings vs Starter"
      },
      {
        "name": "Enterprise Package",
        "credits": 10000000,
        "price": 6000,
        "discount": "40%",
        "pricePerCredit": 0.0006,
        "description": "40% savings vs Starter"
      }
    ],
    "creditCosts": {
      "coreDataInfrastructure": {
        "profiles": {"credits": 4, "unit": "per profile/month"},
        "events": {"credits": 3.5, "unit": "per 100 events"},
        "customObjects": {"credits": 0.5, "unit": "per record/month"},
        "lists": {"credits": 100, "unit": "per list/month"},
        "tags": {"credits": 10, "unit": "per tag/month"},
        "webhooks": {"credits": 10000, "unit": "per webhook/month"},
        "webFeeds": {"credits": 50000, "unit": "per feed/month"}
      },
      "coreMessagingInfrastructure": {
        "templates": {"credits": 1000, "unit": "per template/month"},
        "emailSend": {"credits": 25, "unit": "per email"},
        "smsSend": {"credits": 8500, "unit": "per SMS"}
      },
      "addOnsComposableFeatures": {
        "segments": {"credits": 130, "unit": "per segment/month"},
        "catalogs": {"credits": 100, "unit": "per item/month"},
        "campaigns": {"credits": 50, "unit": "per campaign"},
        "flows": {"credits": 100, "unit": "per flow/month"},
        "forms": {"credits": 10, "unit": "per form/month"}
      },
      "intelligenceAIML": {
        "clvPrediction": {"credits": 500, "unit": "per prediction"},
        "churnPrediction": {"credits": 500, "unit": "per prediction"},
        "sendTimeOptimization": {"credits": 100, "unit": "per optimization"},
        "productRecommendations": {"credits": 250, "unit": "per recommendation"},
        "predictiveSegments": {"credits": 5000, "unit": "per segment/month"},
        "insightsAI": {"credits": 1000, "unit": "per insight"}
      }
    }
  }
}
```

---

## Pricing Model Comparison

```json
{
  "modelComparison": {
    "models": ["Tiered Bundles", "Pure Consumption", "Credits System"],
    "dimensions": [
      {
        "dimension": "Predictability",
        "tiered": "High - Fixed monthly cost",
        "consumption": "Low - Varies with usage",
        "credits": "Medium - Prepaid with known balance"
      },
      {
        "dimension": "Cost Efficiency",
        "tiered": "Medium - May overpay if under limits",
        "consumption": "High - Pay only for actual use",
        "credits": "High - Volume discounts up to 40%"
      },
      {
        "dimension": "Ease of Budgeting",
        "tiered": "Easy - Set monthly budget",
        "consumption": "Hard - Requires usage forecasting",
        "credits": "Medium - Prepay and monitor balance"
      },
      {
        "dimension": "Flexibility",
        "tiered": "Low - Must upgrade tier for more limits",
        "consumption": "High - Unlimited with pay-as-you-go",
        "credits": "High - Use credits across any feature"
      },
      {
        "dimension": "Best For",
        "tiered": "Consistent, predictable workloads",
        "consumption": "Variable or experimental workloads",
        "credits": "High-volume with budget control"
      }
    ]
  }
}
```

---

## Margin Analysis Data

```json
{
  "marginAnalysis": {
    "tiers": [
      {
        "tier": "Free",
        "basePrice": 0,
        "baseCost": 0,
        "baseMargin": "0% (subsidy)",
        "description": "Acquisition tier, subsidized"
      },
      {
        "tier": "Starter",
        "basePrice": 49,
        "baseCost": 13.68,
        "baseMargin": "72%",
        "withTypicalAddons": {
          "revenue": 114,
          "cost": 14.98,
          "margin": "87%",
          "addons": ["Segments $30", "Catalogs $25", "Forms $15"]
        },
        "withAllAddons": {
          "revenue": 219,
          "cost": 23.13,
          "margin": "89%",
          "addons": ["All 5 add-ons"]
        }
      },
      {
        "tier": "Growth",
        "basePrice": 249,
        "baseCost": 81.90,
        "baseMargin": "67%",
        "withTypicalAddons": {
          "revenue": 389,
          "cost": 108.80,
          "margin": "72%",
          "addons": ["Segments $50", "Catalogs $75", "Campaigns $100"]
        },
        "withAllAddons": {
          "revenue": 664,
          "cost": 168.40,
          "margin": "75%",
          "addons": ["All 5 add-ons"]
        }
      },
      {
        "tier": "Scale",
        "basePrice": 899,
        "baseCost": 449.50,
        "baseMargin": "50%",
        "withTypicalAddons": {
          "revenue": 1249,
          "cost": 519.50,
          "margin": "58%",
          "addons": ["Segments $100", "Catalogs $150", "Flows $400"]
        },
        "withAllAddons": {
          "revenue": 1899,
          "cost": 669.50,
          "margin": "65%",
          "addons": ["All 5 add-ons"]
        }
      },
      {
        "tier": "Enterprise",
        "basePrice": 12000,
        "baseCost": 3990,
        "baseMargin": "67%",
        "withTypicalAddons": {
          "revenue": 12000,
          "cost": 3990,
          "margin": "67%",
          "addons": ["All included"]
        },
        "withAllAddons": {
          "revenue": 12000,
          "cost": 3990,
          "margin": "67%",
          "addons": ["All included"]
        }
      }
    ]
  }
}
```

---

## Example Scenarios for Testing

```json
{
  "testScenarios": [
    {
      "name": "Small eCommerce Startup",
      "tier": "Starter",
      "usage": {
        "profiles": 5000,
        "events": "200K/mo",
        "emails": "25K/mo",
        "sms": "500/mo",
        "customObjects": "5K records"
      },
      "addons": ["Segments $30"],
      "expectedCost": 79,
      "expectedMargin": "78%"
    },
    {
      "name": "FinTech Mid-Market",
      "tier": "Growth",
      "usage": {
        "profiles": 25000,
        "events": "2M/mo",
        "emails": "150K/mo",
        "sms": "5K/mo",
        "customObjects": "50K records"
      },
      "addons": ["Segments $50", "Catalogs $75", "Campaigns $100"],
      "expectedCost": 389,
      "expectedMargin": "72%"
    },
    {
      "name": "Large Retail Brand",
      "tier": "Scale",
      "usage": {
        "profiles": 150000,
        "events": "30M/mo",
        "emails": "2M/mo",
        "sms": "30K/mo",
        "customObjects": "300K records"
      },
      "addons": ["Segments $100", "Catalogs $150", "Flows $400", "Campaigns $250"],
      "expectedCost": 1899,
      "expectedMargin": "65%"
    },
    {
      "name": "Enterprise Multi-Brand",
      "tier": "Enterprise",
      "usage": {
        "profiles": "500K+",
        "events": "100M+/mo",
        "emails": "10M+/mo",
        "sms": "100K+/mo",
        "customObjects": "1M+ records"
      },
      "addons": ["All included + Intelligence Beta"],
      "expectedCost": 12000,
      "expectedMargin": "67%"
    }
  ]
}
```

---

**Data Version:** 1.0
**Last Updated:** April 7, 2026
**Format:** JSON-style markdown for easy parsing by JavaScript

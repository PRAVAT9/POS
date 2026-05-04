# POS System (Closed Protocol)

A lightweight, specialized Point of Sale system designed for internal sales management and data tracking. This system is optimized for a closed environment with a limited footprint of 5-8 devices.

## 🔒 Access Protocol
This system operates on a **Closed Protocol** basis. Access is strictly limited to:
- **Administrators:** Full system control, inventory management, and financial reporting.
- **Salespersons:** Transaction processing and stock viewing.

**Deployment Constraint:** This version is architected for a maximum of 8 concurrent devices to ensure optimal performance and data consistency within its current tracking scope.

## ✨ Core Features

### 📦 Inventory & Stock Management
- **Full Product Lifecycle:** Complete CRUD operations for products, including category and location tagging.
- **Real-time Availability:** Automated "Sold Out" status based on current stock levels.
- **Multi-Location Tracking:** Track stock across different physical locations.
- **Inter-Location Logistics:** Create and receive shipments to move stock between locations, with automated inventory increments upon receipt.

### 💰 Sales & Transaction Tracking
- **Fast Checkout:** streamlined sale recording with integrated discount application.
- **Transaction History:** Date-filtered logs of all completed sales for auditing and tracking.
- **Stock Synchronization:** Automatic stock deduction upon every successful sale.

### 📊 Admin Insights & Reporting
- **KPI Dashboard:** Real-time tracking of:
  - Total Revenue
  - Total Items Sold
  - Total Stock Value
  - Active vs. Sold-Out Product counts.

### 🛠 Technical Infrastructure
- **Tech Stack:** React 19, TypeScript, Node.js (Express), and Supabase (PostgreSQL).
- **Hybrid Data Layer:** Combines Supabase Realtime for synchronization with a LocalStorage mirror for basic offline resilience.
- **Data Migration:** Built-in migration utility to transition data from local fallback to the central Supabase cloud.

## 🎯 Primary Purpose
This system is dedicated exclusively to **Sales Management** and **Data Tracking**. It is not intended for public-facing commerce and does not include external payment gateways or fiscal tax modules.

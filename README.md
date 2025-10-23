# Sentinel: From Request to Readiness

*A system that blends governance with autonomy*

------------------------------------------------------------------------

## Overview

**Sentinel** is a full-stack platform that helps engineering teams **request, approve, and provision infrastructure** and then **automatically run reliability and security checks** on those environments before release.

Built with **React**, **Node.js**, **PostgreSQL**, and **Redis**. Sentinel turns complex DevOps and security workflows into a single seamless experience, from request to readiness.

------------------------------------------------------------------------

## Why?

In fast-moving teams, infrastructure often gets created faster than it gets reviewed.

**Sentinel** ensures every environment (no matter how temporary) is
- **Requested and approved** with full auditability
- **Provisioned automatically** and traceably
- **Scanned intelligently** for issues before going live

It's a guardrail, not a gatekeeper. Helping teams move faster, but safer.

------------------------------------------------------------------------

## What?

  **1. Request & Approve:** Engineers submit infrastructure requests, managers review and approve. All logged with comments and timestamps.

  **2. Provision & Track:** Provisioning happens automatically, each environment moves through clear lifecycle states (pending → approved → provisioned → retired).

  **3. Scan & Validate:** Once provisioned, Sentinel orchestrates lightweight automated checks (headers, HTTPS, CSP etc.) and records proof-backed findings.

  **4. Review & Close:** Findings appear in a triage dashboard for validation, while environment history remains auditable and exportable.

------------------------------------------------------------------------

## How?

-   **Backend:** Node.js / TypeScript microservices for API, orchestration and job processing
-   **Queue:** Redis + BullMQ for asynchronous workflows
-   **Worker:** Go workers simulating real-world scanners
-   **Database:** PostgreSQL with Prisma ORM
-   **Frontend:** React + Tailwind + Framer Motion for an intuitive triage and provisioning UI
-   **Storage:** Local `/data/evidence` folder for proof artifacts (extendable to S3)

------------------------------------------------------------------------

## 🚀 Vision

> Sentinel isn't just another admin dashboard.\
> It's a learning platform that shows how human collaboration and
> machine automation can coexist in modern infrastructure systems, an
> intersection of **system design** and **product design**.


------------------------------------------------------------------------

## 🧑‍💻

**Utkarsh Soni**\
I design the product and build the system for it.

------------------------------------------------------------------------
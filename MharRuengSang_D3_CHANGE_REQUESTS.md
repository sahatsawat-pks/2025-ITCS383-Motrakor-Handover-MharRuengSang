# SteamJek - Feature Change Requests

Based on the Point Shop and Community Features, the following 8 Change Requests (CRs) have been categorized by maintenance type:

## Corrective Changes

| Attribute | Description |
| :--- | :--- |
| **Associated Feature** | Community Hub Search |
| **Description** | Search returns no results or crashes when the query contains special characters such as %, &, and @ |
| **Maintenance Type** | Corrective |
| **Priority** | High |
| **Severity** | Critical |
| **Time to Implement** | 1.5 person-weeks |
| **Verification Method** | Testing and inspection |

<br>

| Attribute | Description |
| :--- | :--- |
| **Associated Feature** | Point Shop Earning System |
| **Description** | Earning calculation evaluates 100 points per $3.00, but the checkout function incorrectly truncates purchase values, causing users to lose points on fractional remainders (e.g., $5.99 yields 100 instead of keeping track of remainders). |
| **Maintenance Type** | Corrective |
| **Priority** | Medium |
| **Severity** | Major |
| **Time to Implement** | 0.5 person-weeks |
| **Verification Method** | Unit testing and manual transaction testing |

<br>

## Adaptive Changes

| Attribute | Description |
| :--- | :--- |
| **Associated Feature** | Point Shop & Community UI Architecture |
| **Description** | Adapt the new Point Shop grids and Community Hub thread layouts to render dynamically based on the Flutter mobile app environment vs the Web HTML layout. |
| **Maintenance Type** | Adaptive |
| **Priority** | High |
| **Severity** | Major |
| **Time to Implement** | 2 person-weeks |
| **Verification Method** | UI/UX inspection on web browsers and mobile emulators |

<br>

| Attribute | Description |
| :--- | :--- |
| **Associated Feature** | PostgreSQL Database Schema Migration |
| **Description** | Modify and adapt the existing User architecture to support incoming highly-relational data structures for Community posts and Point Shop ledgers in the new database environment. |
| **Maintenance Type** | Adaptive |
| **Priority** | High |
| **Severity** | Critical |
| **Time to Implement** | 1.5 person-weeks |
| **Verification Method** | Database migration verification and integration testing |

<br>

## Perfective Changes

| Attribute | Description |
| :--- | :--- |
| **Associated Feature** | Community Hub Thread List |
| **Description** | Add infinite scrolling or pagination to the Community Hub thread list to improve rendering speed and enhance the user experience when handling large volumes of discussions. |
| **Maintenance Type** | Perfective |
| **Priority** | Medium |
| **Severity** | Minor |
| **Time to Implement** | 1 person-week |
| **Verification Method** | Performance profiling and visual inspection |

<br>

| Attribute | Description |
| :--- | :--- |
| **Associated Feature** | Point Shop Cosmetic Items |
| **Description** | Implement a visual "Preview" button allowing users to see exactly how a game-specific banner or avatar frame looks on their personal profile before confirming point redemption. |
| **Maintenance Type** | Perfective |
| **Priority** | Low |
| **Severity** | Minor |
| **Time to Implement** | 1.5 person-weeks |
| **Verification Method** | User acceptance testing (UAT) and inspection |

<br>

## Preventive Changes

| Attribute | Description |
| :--- | :--- |
| **Associated Feature** | Community Hub Thread Creation |
| **Description** | Implement API rate-limiting rules and spam-validation checks on "Create Thread" and "Reply" features to prevent future automated database exhaustion attacks from bots. |
| **Maintenance Type** | Preventive |
| **Priority** | High |
| **Severity** | Major |
| **Time to Implement** | 1 person-week |
| **Verification Method** | Load testing, stress testing, and automated security scans |

<br>

| Attribute | Description |
| :--- | :--- |
| **Associated Feature** | Community Hub Searching & Tag Filtering |
| **Description** | Add database-level indexing (B-tree) on the 'tag' and 'game_id' columns to prevent severe query latency issues as the volume of user-generated thread data grows over time. |
| **Maintenance Type** | Preventive |
| **Priority** | Medium |
| **Severity** | Moderate |
| **Time to Implement** | 0.5 person-weeks |
| **Verification Method** | Database query profiling (EXPLAIN plans) and inspection |


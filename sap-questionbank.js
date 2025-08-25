window.questionBank = [
    // Domain 1: Design Solutions for Organizational Complexity (26% = ~104 questions)
    {
        id: 'sap_001',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "A multinational corporation has 50+ AWS accounts across different business units. Each unit manages their own accounts with varying security standards. The CISO requires centralized security monitoring, compliance enforcement, and cost optimization while allowing business units to maintain operational autonomy.",
        question: "Which combination of services and strategies provides the MOST comprehensive solution?",
        options: [
            "AWS Organizations with SCPs, AWS Control Tower for account provisioning, AWS Security Hub for compliance monitoring, and AWS Cost Explorer with consolidated billing",
            "AWS SSO for access management, individual CloudTrail in each account, AWS Config for compliance, and manual cost allocation tags",
            "AWS Landing Zone, third-party SIEM integration, AWS Trusted Advisor for all accounts, and AWS Budgets per account",
            "Federation with corporate Active Directory, AWS CloudFormation StackSets for governance, Amazon GuardDuty in each account, and AWS Cost and Usage Reports"
        ],
        correct: 0,
        explanation: {
            correct: "This combination provides centralized governance (Organizations + SCPs), standardized account provisioning (Control Tower), unified security monitoring (Security Hub aggregates findings), and consolidated cost management - the most comprehensive solution for enterprise-scale management.",
            whyWrong: {
                1: "Individual CloudTrail and manual tags lack centralization and automation needed at this scale",
                2: "AWS Landing Zone is deprecated in favor of Control Tower, and lacks native compliance monitoring",
                3: "While functional, this approach lacks the unified governance and standardization of Control Tower"
            },
            examStrategy: "For multi-account governance questions, Control Tower + Organizations + Security Hub is the modern AWS best practice. Remember Control Tower replaced Landing Zone."
        }
    },
    {
        id: 'sap_002',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "medium",
        timeRecommendation: 150,
        scenario: "A healthcare organization needs to share patient imaging data between multiple AWS accounts belonging to different hospital networks. The solution must maintain HIPAA compliance, provide audit trails, and allow data providers to revoke access instantly.",
        question: "What is the MOST secure and compliant approach?",
        options: [
            "Use AWS RAM to share encrypted S3 buckets with versioning enabled, AWS CloudTrail for audit logging, and resource-based policies for access control",
            "Implement AWS DataSync between accounts with VPC peering, enable S3 Object Lock for compliance, and use AWS IAM roles for cross-account access",
            "Create a centralized data lake with AWS Lake Formation, implement fine-grained access controls, and use AWS Glue for data cataloging",
            "Deploy AWS Storage Gateway in each account, replicate data using AWS Backup, and implement AWS KMS with customer-managed keys"
        ],
        correct: 2,
        explanation: {
            correct: "Lake Formation provides fine-grained access control at the column and row level, perfect for HIPAA compliance. It offers centralized permissions management with instant revocation capabilities and comprehensive audit trails.",
            whyWrong: {
                0: "RAM is good for sharing but lacks the fine-grained access control needed for HIPAA data",
                1: "DataSync is for migration/transfer, not for controlled sharing with revocation capabilities",
                3: "Storage Gateway doesn't provide the centralized access control and instant revocation required"
            },
            examStrategy: "Lake Formation is the go-to service for secure, compliant data sharing with fine-grained access control across accounts."
        }
    },
    {
        id: 'sap_003',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "A global retail company is implementing a disaster recovery strategy across three regions. The RTO is 1 hour and RPO is 15 minutes for critical systems. The company uses a mix of EC2, RDS, DynamoDB Global Tables, and S3. Budget is a significant constraint.",
        question: "Which DR strategy provides the BEST balance of meeting requirements while minimizing costs?",
        options: [
            "Pilot Light: Minimal resources in DR regions, automated AMI copying, RDS automated backups with cross-region read replicas for critical databases, and S3 cross-region replication",
            "Warm Standby: Scaled-down environment running continuously in DR regions, RDS Multi-AZ with read replicas, and Route 53 health checks for failover",
            "Multi-Site Active-Active: Full production capacity in all regions with Route 53 weighted routing, Aurora Global Database, and DynamoDB Global Tables",
            "Backup and Restore: AWS Backup for all resources, S3 lifecycle policies for cost optimization, and AWS Lambda for automated recovery orchestration"
        ],
        correct: 0,
        explanation: {
            correct: "Pilot Light meets the 1-hour RTO (time to scale up minimal resources) and 15-minute RPO (through read replicas and S3 replication) while minimizing costs by not running full infrastructure continuously.",
            whyWrong: {
                1: "Warm Standby exceeds requirements and increases costs with continuously running scaled resources",
                2: "Multi-Site is excessive for these requirements and very expensive with full production capacity everywhere",
                3: "Backup and Restore cannot meet the 1-hour RTO requirement for complex systems"
            },
            examStrategy: "Match DR strategy to specific RTO/RPO requirements. Pilot Light is ideal for RTO of 1-4 hours with tight budget constraints."
        }
    },
    {
        id: 'sap_004',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "medium",
        timeRecommendation: 150,
        scenario: "An enterprise wants to implement a hub-and-spoke network architecture connecting 30 VPCs across 5 regions. On-premises connectivity is required through multiple data centers. The solution must minimize management overhead and provide transitive routing.",
        question: "What is the MOST scalable and manageable solution?",
        options: [
            "AWS Transit Gateway in each region with Transit Gateway peering, AWS Direct Connect with Transit VIF, and Transit Gateway route tables for routing control",
            "VPC Peering mesh between all VPCs, Virtual Private Gateway in each VPC, and AWS Direct Connect with hosted VIFs",
            "AWS PrivateLink endpoints in each VPC, AWS Site-to-Site VPN for on-premises connectivity, and Route 53 Resolver for DNS",
            "Shared VPC with AWS RAM, VPC Endpoint Services for cross-VPC communication, and AWS Direct Connect Gateway"
        ],
        correct: 0,
        explanation: {
            correct: "Transit Gateway provides true hub-and-spoke with transitive routing, scales to thousands of VPCs, and inter-region peering enables global connectivity. Transit VIF simplifies Direct Connect integration.",
            whyWrong: {
                1: "VPC Peering doesn't support transitive routing and creates an unmanageable mesh at this scale (435 peering connections needed)",
                2: "PrivateLink doesn't provide general network connectivity, only service-specific endpoints",
                3: "Shared VPC doesn't work across regions and VPC Endpoints don't provide general transit routing"
            },
            examStrategy: "Transit Gateway is the answer for any large-scale hub-and-spoke or complex routing scenario. Remember: supports 5000 VPCs per TGW."
        }
    },
    {
        id: 'sap_005',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "medium",
        timeRecommendation: 120,
        scenario: "A financial services firm needs to implement data residency controls ensuring that sensitive data never leaves specific AWS regions. They also need to prevent developers from accidentally creating resources in non-compliant regions.",
        question: "Which combination of controls provides the STRONGEST enforcement?",
        options: [
            "AWS Organizations SCPs with region restrictions, AWS Config rules for compliance checking, and S3 bucket policies with aws:RequestedRegion condition",
            "IAM permission boundaries with region conditions, AWS CloudFormation with region parameters, and Amazon Macie for data discovery",
            "AWS Control Tower guardrails, VPC Endpoint policies with region restrictions, and AWS KMS key policies",
            "AWS Identity Center permission sets with region limitations, AWS Config conformance packs, and S3 Block Public Access"
        ],
        correct: 0,
        explanation: {
            correct: "SCPs provide preventive controls at the organization level that cannot be overridden, Config rules detect violations, and S3 bucket policies with RequestedRegion ensure data residency at the resource level.",
            whyWrong: {
                1: "Permission boundaries can be bypassed if not consistently applied to all principals",
                2: "Control Tower guardrails are good but less granular than custom SCPs for specific region control",
                3: "Identity Center permissions can be overridden by direct IAM permissions in accounts"
            },
            examStrategy: "SCPs are the strongest preventive control in Organizations - they cannot be overridden even by account root users."
        }
    },
    {
        id: 'sap_006',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "A pharmaceutical company with 100+ AWS accounts needs to implement a centralized logging solution for security and compliance. Logs must be tamper-proof, searchable for 7 years, and enable real-time security alerts. The solution must handle 10TB of logs daily.",
        question: "Which architecture provides the MOST secure and scalable logging solution?",
        options: [
            "CloudTrail Organization trail to centralized S3 bucket with MFA delete, S3 Object Lock for immutability, Amazon OpenSearch for search, and EventBridge for real-time alerts",
            "CloudWatch Logs with cross-account subscriptions, Kinesis Data Firehose for aggregation, S3 Glacier for long-term storage, and CloudWatch Alarms for alerting",
            "AWS Systems Manager Session Manager for logging, DynamoDB for log storage with encryption, Lambda for log processing, and SNS for notifications",
            "VPC Flow Logs to S3, AWS Glue for ETL, Redshift for analytics, and QuickSight for visualization"
        ],
        correct: 0,
        explanation: {
            correct: "Organization trail centralizes all CloudTrail logs, Object Lock ensures immutability for compliance, OpenSearch handles 10TB daily with powerful search capabilities, and EventBridge enables real-time response to security events.",
            whyWrong: {
                1: "CloudWatch Logs becomes expensive for 7-year retention at this scale",
                2: "Session Manager only logs interactive sessions, not comprehensive audit trails",
                3: "VPC Flow Logs only capture network traffic, missing application and API audit trails"
            },
            examStrategy: "For centralized logging: CloudTrail Organization trail + S3 Object Lock for compliance + OpenSearch for analysis at scale."
        }
    },
    {
        id: 'sap_007',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "medium",
        timeRecommendation: 150,
        scenario: "A media conglomerate needs to implement cost allocation and chargeback across 75 AWS accounts belonging to different production studios. Each studio has multiple projects with varying budgets and resource requirements.",
        question: "What provides the MOST accurate cost tracking and allocation?",
        options: [
            "AWS Cost Categories with rule-based allocation, cost allocation tags enforced via SCPs, AWS Budgets with alerts, and Cost Explorer with custom reports",
            "Manual tagging strategy, AWS Cost and Usage Reports exported to S3, Athena for analysis, and QuickSight dashboards",
            "AWS Billing Conductor for custom billing, consolidated billing in Organizations, and third-party cost management tools",
            "Resource Groups for organization, Trusted Advisor for optimization, CloudWatch billing alarms, and monthly AWS bill analysis"
        ],
        correct: 0,
        explanation: {
            correct: "Cost Categories enable flexible hierarchical allocation, SCP-enforced tags ensure compliance, Budgets provide proactive control, and Cost Explorer offers detailed analysis - providing comprehensive cost management.",
            whyWrong: {
                1: "Manual tagging is error-prone and lacks enforcement mechanisms",
                2: "Billing Conductor is for AWS Partners/resellers, not internal chargeback",
                3: "This approach lacks granular allocation and automated enforcement"
            },
            examStrategy: "Cost Categories + enforced tagging via SCPs is the enterprise pattern for accurate cost allocation and chargeback."
        }
    },
    {
        id: 'sap_008',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "A global bank requires all data to be encrypted with customer-managed keys that automatically rotate every 90 days. Keys must be stored in hardware security modules, and key usage must be audited across 200+ AWS accounts. The solution must support cross-region replication of encrypted data.",
        question: "Which key management architecture provides the MOST secure and scalable solution?",
        options: [
            "AWS KMS with customer-managed CMKs in each region, automatic key rotation enabled, CloudHSM as custom key store, cross-account key policies, and CloudTrail for key usage auditing",
            "AWS CloudHSM clusters in each region with client-side encryption, Parameter Store for key distribution, Lambda functions for rotation, and CloudWatch Events for auditing",
            "AWS Secrets Manager for key storage with automatic rotation, KMS for envelope encryption, AWS Config for compliance checking, and S3 bucket policies for encryption enforcement",
            "Third-party HSM on EC2 instances, Systems Manager for key distribution, AWS Backup for key backups, and Amazon Macie for encryption validation"
        ],
        correct: 0,
        explanation: {
            correct: "KMS with CloudHSM as custom key store provides FIPS 140-2 Level 3 HSM protection, automatic rotation handles the 90-day requirement, multi-region CMKs enable encrypted replication, and CloudTrail provides comprehensive key usage auditing across all accounts.",
            whyWrong: {
                1: "Direct CloudHSM usage requires complex client-side implementation and manual cross-region coordination",
                2: "Secrets Manager is for application secrets, not for data encryption key management at scale",
                3: "Third-party HSM lacks native AWS integration and creates operational overhead"
            },
            examStrategy: "KMS with CloudHSM custom key store is the premium solution for regulated industries requiring HSM-backed keys with AWS integration."
        }
    },
    {
        id: 'sap_009',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "medium",
        timeRecommendation: 150,
        scenario: "An insurance company needs to implement a data governance framework across multiple AWS accounts. They must track data lineage, ensure PII is properly classified and protected, and maintain compliance with GDPR requirements.",
        question: "Which combination of services provides comprehensive data governance?",
        options: [
            "AWS Glue DataBrew for data profiling, Amazon Macie for PII discovery, AWS Glue Data Catalog for metadata, and Lake Formation for access control",
            "AWS DataSync for data movement tracking, S3 Inventory for data classification, CloudWatch Logs for audit trails, and IAM policies for access control",
            "Amazon Comprehend for PII detection, DynamoDB for metadata storage, Lambda for data processing, and CloudTrail for compliance",
            "AWS Data Pipeline for lineage tracking, S3 Object Tags for classification, Config Rules for compliance, and KMS for encryption"
        ],
        correct: 0,
        explanation: {
            correct: "This combination provides complete data governance: DataBrew profiles data quality, Macie automatically discovers and classifies PII, Glue Catalog maintains metadata and lineage, and Lake Formation enforces fine-grained access controls for GDPR compliance.",
            whyWrong: {
                1: "DataSync is for migration, not lineage tracking, and lacks PII discovery capabilities",
                2: "Comprehend is for text analysis, not comprehensive PII discovery across data types",
                3: "Data Pipeline is legacy and doesn't provide modern data governance capabilities"
            },
            examStrategy: "For data governance: Macie for PII discovery + Glue for cataloging + Lake Formation for access control."
        }
    },
    {
        id: 'sap_010',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "A multinational corporation needs to implement a zero-trust network architecture across 15 AWS regions. Remote employees must securely access resources in any region without traditional VPN. The solution must provide microsegmentation and east-west traffic inspection.",
        question: "Which architecture BEST implements zero-trust principles at scale?",
        options: [
            "AWS Verified Access for identity-based access, AWS Network Firewall for traffic inspection, VPC Lattice for service-to-service communication, and CloudWatch for centralized logging",
            "AWS Client VPN with SAML authentication, Transit Gateway with security domains, GuardDuty for threat detection, and VPC Flow Logs for monitoring",
            "AWS SSO with MFA, PrivateLink endpoints for all services, Security Groups with least privilege, and AWS WAF for application protection",
            "AWS AppStream for remote access, Service Mesh with Istio on EKS, Network ACLs for segmentation, and Amazon Detective for investigation"
        ],
        correct: 0,
        explanation: {
            correct: "Verified Access provides true zero-trust without VPN, Network Firewall enables deep packet inspection for east-west traffic, VPC Lattice handles secure service mesh without complexity, and centralized logging enables security monitoring.",
            whyWrong: {
                1: "Client VPN maintains traditional perimeter security, not zero-trust architecture",
                2: "This lacks proper traffic inspection and service-to-service zero-trust controls",
                3: "AppStream is for application streaming, not general resource access"
            },
            examStrategy: "AWS Verified Access is the zero-trust access solution. VPC Lattice is the AWS-native service mesh for service-to-service communication."
        }
    },
    {
        id: 'sap_011',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "medium",
        timeRecommendation: 150,
        scenario: "A government agency requires complete isolation between different classification levels of data (Unclassified, Confidential, Secret). Each level has its own set of AWS accounts. No data can flow from higher to lower classifications.",
        question: "Which network architecture ensures the STRONGEST isolation?",
        options: [
            "Separate AWS Organizations for each classification level, no network connectivity between Organizations, and dedicated Direct Connect virtual interfaces per level",
            "Single Organization with OUs per classification, Transit Gateway with isolated route tables, and Security Groups with deny rules",
            "VPC peering with asymmetric routing, Network ACLs for isolation, and AWS PrivateLink for controlled service access",
            "Shared Services VPC with multiple private subnets, AWS Firewall Manager for centralized rules, and VPC endpoints for service access"
        ],
        correct: 0,
        explanation: {
            correct: "Separate Organizations provide complete administrative and network isolation. No connectivity between them ensures data cannot flow between classification levels, and dedicated Direct Connect VIFs maintain isolation to on-premises.",
            whyWrong: {
                1: "Transit Gateway still allows potential for misconfiguration and data leakage between levels",
                2: "VPC peering creates network paths that could be exploited despite security controls",
                3: "Shared VPC inherently connects different classification levels, violating isolation requirements"
            },
            examStrategy: "For complete isolation requirements (government, military), separate Organizations provide the strongest boundary."
        }
    },
    {
        id: 'sap_012',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "A healthcare network with 50 hospitals needs to implement a centralized PACS (Picture Archiving and Communication System) on AWS. Each hospital generates 5TB of medical images daily. Images must be accessible within 1 second for 30 days, within 1 minute for 1 year, and archived for 7 years.",
        question: "Which storage architecture optimizes both performance and cost?",
        options: [
            "S3 Standard for 30 days with CloudFront caching, S3 Intelligent-Tiering with archive tiers configured, and S3 Batch Operations for lifecycle transitions",
            "EFS with provisioned throughput for hot data, S3 Standard-IA for warm data, and Glacier Deep Archive for long-term storage with DataSync for transitions",
            "FSx for Lustre for high-performance access, S3 Standard for 1-year storage, and Glacier Flexible Retrieval with vault lock for compliance",
            "EBS volumes with snapshots to S3, Storage Gateway for hybrid access, and AWS Backup for long-term retention management"
        ],
        correct: 0,
        explanation: {
            correct: "S3 Standard provides millisecond access for 30 days, Intelligent-Tiering automatically moves data through Instant/Frequent/Infrequent/Archive tiers based on access patterns, perfectly matching the requirements while optimizing costs. CloudFront ensures sub-second access globally.",
            whyWrong: {
                1: "EFS is expensive for 5TB daily and DataSync transitions are manual, not policy-based",
                2: "FSx for Lustre is overkill for image viewing and expensive for long-term storage",
                3: "EBS doesn't scale well for multi-hospital access and snapshot management is complex"
            },
            examStrategy: "S3 Intelligent-Tiering is ideal for unknown or changing access patterns. It now includes Archive tiers for complete lifecycle management."
        }
    },
    {
        id: 'sap_013',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "medium",
        timeRecommendation: 150,
        scenario: "A financial institution needs to implement strong workload isolation for different business units while maintaining centralized billing and security oversight. Each unit needs autonomy to manage their own resources and budgets.",
        question: "Which AWS Organizations structure provides the BEST balance of autonomy and control?",
        options: [
            "Nested OUs with delegated administrator accounts per business unit, SCPs for guardrails, and AWS Control Tower Account Factory for standardized provisioning",
            "Flat OU structure with all accounts at root level, IAM roles for cross-account access, and CloudFormation StackSets for governance",
            "Single account with VPC per business unit, Resource Groups for isolation, and IAM policies for access control",
            "Separate AWS Organizations per business unit with consolidated billing agreement and cross-organization trusts"
        ],
        correct: 0,
        explanation: {
            correct: "Nested OUs allow hierarchical policy inheritance, delegated administrators provide autonomy while maintaining central oversight, SCPs enforce security guardrails, and Account Factory ensures consistent account provisioning.",
            whyWrong: {
                1: "Flat structure lacks hierarchical policy management and becomes unwieldy at scale",
                2: "Single account violates workload isolation requirements and creates blast radius risks",
                3: "Separate Organizations lose centralized control and complicate billing/security management"
            },
            examStrategy: "Nested OUs with delegated administration is the pattern for balancing autonomy with centralized governance."
        }
    },
    {
        id: 'sap_014',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "A global logistics company needs to track shipments across 100+ countries with real-time updates. The system must handle 1 million concurrent tracking requests, provide 99.99% availability, and maintain data sovereignty per country regulations.",
        question: "Which architecture ensures global scale with data sovereignty?",
        options: [
            "DynamoDB Global Tables with region-per-country deployment, API Gateway with edge-optimized endpoints, Lambda@Edge for routing based on origin country, and Route 53 geolocation routing",
            "Aurora Global Database with write forwarding, CloudFront with multiple origins, ECS Fargate for processing, and AWS Global Accelerator for routing",
            "Single-region RDS with read replicas, S3 with Cross-Region Replication, EC2 Auto Scaling, and CloudFront for caching",
            "Amazon Timestream in each region, Kinesis Data Streams for real-time updates, AppSync for GraphQL API, and Transfer Family for data ingestion"
        ],
        correct: 0,
        explanation: {
            correct: "DynamoDB Global Tables provides multi-region active-active with local reads/writes for sovereignty, API Gateway handles massive concurrent requests, Lambda@Edge routes requests to correct region for compliance, and Route 53 ensures users connect to their local region.",
            whyWrong: {
                1: "Aurora Global Database has single write region, violating data sovereignty requirements",
                2: "Single-region RDS cannot meet data sovereignty requirements for 100+ countries",
                3: "Timestream is for time-series data, not general shipment tracking, and lacks global tables feature"
            },
            examStrategy: "DynamoDB Global Tables is the solution for multi-region active-active with data sovereignty requirements."
        }
    },
    {
        id: 'sap_015',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "medium",
        timeRecommendation: 150,
        scenario: "An enterprise needs to implement privileged access management for administrative access to 200+ AWS accounts. Access must require approval, be time-limited, and maintain detailed audit logs for compliance.",
        question: "Which solution provides the MOST secure privileged access management?",
        options: [
            "AWS Systems Manager Session Manager with IAM Identity Center, temporary elevated access via AWS Service Catalog, and CloudTrail for audit logging",
            "AWS Secrets Manager for credential rotation, Lambda functions for approval workflow, and CloudWatch Logs for auditing",
            "HashiCorp Vault on EC2 for credential management, Step Functions for approval workflow, and S3 for audit log storage",
            "IAM users with MFA, manual approval process via email, and AWS Config for compliance tracking"
        ],
        correct: 0,
        explanation: {
            correct: "Session Manager provides secure shell access without SSH keys, Identity Center enables temporary elevation with approval workflows, Service Catalog can provision time-limited access, and CloudTrail provides comprehensive audit logging.",
            whyWrong: {
                1: "Secrets Manager doesn't provide session management or approval workflows for interactive access",
                2: "Third-party solutions add complexity and don't integrate natively with AWS services",
                3: "Manual processes don't scale and lack automated time-limiting capabilities"
            },
            examStrategy: "Session Manager + Identity Center is AWS's solution for privileged access management without managing SSH keys or passwords."
        }
    },
    {
        id: 'sap_016',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "A multinational bank needs to implement a fraud detection system processing 500,000 transactions per second across 50 countries. The system must detect anomalies in real-time, maintain 5-year historical analysis, and comply with regional data privacy laws.",
        question: "Which architecture provides the required scale and compliance?",
        options: [
            "Amazon Kinesis Data Streams with sharding per region, Kinesis Analytics with ML models, DynamoDB for hot data, S3 with Athena for historical analysis, and Lambda for regional compliance rules",
            "Amazon MSK with cluster per region, SageMaker for fraud detection, ElastiCache for real-time scoring, Redshift for historical data, and Glue for ETL",
            "API Gateway with WAF, Lambda with reserved concurrency, Aurora Serverless for transactions, QuickSight for analytics, and Macie for compliance",
            "EventBridge for event routing, Step Functions for orchestration, RDS PostgreSQL with read replicas, OpenSearch for analysis, and Config for compliance"
        ],
        correct: 0,
        explanation: {
            correct: "Kinesis handles 500K TPS with automatic sharding, Analytics provides real-time ML processing, DynamoDB offers microsecond latency for hot data, S3+Athena cost-effectively handles 5-year analysis, and Lambda enforces regional compliance rules.",
            whyWrong: {
                1: "MSK requires more management overhead and SageMaker adds latency for real-time detection",
                2: "Aurora Serverless cannot handle 500K TPS and Lambda has concurrency limits at this scale",
                3: "EventBridge has throughput limits and RDS cannot scale to 500K TPS"
            },
            examStrategy: "For real-time analytics at massive scale: Kinesis Data Streams + Analytics + DynamoDB for hot path, S3 + Athena for cold path."
        }
    },
    {
        id: 'sap_017',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "medium",
        timeRecommendation: 150,
        scenario: "A research institution needs to share genomic datasets (100TB+) with partner organizations while maintaining strict access controls, tracking usage for billing, and ensuring HIPAA compliance.",
        question: "Which data sharing architecture provides the necessary controls and compliance?",
        options: [
            "AWS Data Exchange for data publishing, Lake Formation for access control, CloudTrail Lake for usage analytics, and AWS Marketplace for billing",
            "S3 with presigned URLs, Cognito for authentication, CloudWatch for usage tracking, and manual invoicing",
            "Transfer Family with SFTP, IAM roles for partners, Cost and Usage Reports for billing, and Macie for compliance",
            "Direct Connect with partners, EFS for shared storage, Resource Access Manager for sharing, and AWS Billing Conductor"
        ],
        correct: 0,
        explanation: {
            correct: "Data Exchange provides secure data sharing with built-in billing, Lake Formation ensures fine-grained HIPAA-compliant access control, CloudTrail Lake enables usage analytics, and Marketplace handles automated billing.",
            whyWrong: {
                1: "Presigned URLs don't provide fine-grained access control needed for HIPAA",
                2: "Transfer Family lacks advanced access controls and usage tracking capabilities",
                3: "Direct Connect is expensive and EFS doesn't provide data governance features"
            },
            examStrategy: "AWS Data Exchange is the service for monetizing and sharing data products with external organizations."
        }
    },
    {
        id: 'sap_018',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "An automotive manufacturer needs to collect telemetry from 10 million vehicles globally, process data for predictive maintenance, and provide real-time alerts to drivers. The system must handle spotty cellular connectivity and minimize data transfer costs.",
        question: "Which IoT architecture optimizes for reliability and cost?",
        options: [
            "AWS IoT Core with MQTT, IoT Analytics for processing, IoT Events for alerting, IoT Device Management for OTA updates, and IoT SiteWise for edge processing",
            "API Gateway with REST APIs, Kinesis for streaming, Lambda for processing, SNS for notifications, and DynamoDB for device state",
            "AppSync with GraphQL subscriptions, EventBridge for routing, Batch for processing, SES for alerts, and S3 for telemetry storage",
            "Direct Connect with VPN backup, EC2 for MQTT brokers, EMR for analytics, CloudWatch for alerting, and RDS for device registry"
        ],
        correct: 0,
        explanation: {
            correct: "IoT Core handles intermittent connectivity with MQTT QoS, IoT Analytics provides managed analytics, IoT Events enables complex event detection, Device Management handles fleet-wide updates, and SiteWise processes data at edge reducing transfer costs.",
            whyWrong: {
                1: "API Gateway doesn't handle intermittent connectivity well and lacks IoT-specific features",
                2: "AppSync isn't optimized for IoT telemetry and lacks device management capabilities",
                3: "Self-managed MQTT brokers don't scale to 10 million devices efficiently"
            },
            examStrategy: "AWS IoT suite is purpose-built for large-scale IoT deployments. IoT SiteWise for edge processing reduces data transfer costs."
        }
    },
    {
        id: 'sap_019',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "medium",
        timeRecommendation: 150,
        scenario: "A media company needs to implement content rights management across multiple streaming platforms. Different content has varying geographic restrictions, time-based availability, and device-specific access rules.",
        question: "Which architecture provides flexible rights management?",
        options: [
            "CloudFront with signed URLs/cookies, Lambda@Edge for access validation, DynamoDB for rights metadata, and AWS Elemental MediaPackage for DRM",
            "S3 with bucket policies, IAM roles for platform access, Config Rules for compliance, and CloudWatch Events for expiration",
            "API Gateway with API keys, Cognito for user pools, RDS for rights database, and WAF for geo-blocking",
            "Application Load Balancer with path-based routing, ECS for validation services, ElastiCache for rules, and Route 53 for geo-routing"
        ],
        correct: 0,
        explanation: {
            correct: "CloudFront signed URLs/cookies provide secure, time-limited access, Lambda@Edge enables complex validation at edge locations, DynamoDB offers fast global rights lookup, and MediaPackage provides industry-standard DRM.",
            whyWrong: {
                1: "S3 bucket policies aren't granular enough for complex rights management",
                2: "API Gateway doesn't handle video streaming efficiently and lacks DRM",
                3: "ALB-based solution lacks edge capabilities and built-in DRM support"
            },
            examStrategy: "CloudFront + Lambda@Edge is the pattern for complex access control at edge. MediaPackage provides DRM for streaming."
        }
    },
    {
        id: 'sap_020',
        domain: "Domain 1: Design Solutions for Organizational Complexity",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "A fintech startup building a cryptocurrency exchange needs to process 1 million transactions per second, maintain an immutable audit trail, detect fraud in real-time, and comply with regulations in 30 countries.",
        question: "Which architecture meets these demanding requirements?",
        options: [
            "Amazon QLDB for immutable ledger, Kinesis Data Streams for transaction processing, SageMaker for fraud detection, DynamoDB for order book, and Lambda for compliance rules per country",
            "Managed Blockchain for immutability, API Gateway for transactions, Fraud Detector for anomaly detection, Aurora for order matching, and Config for compliance",
            "DynamoDB Streams with KMS encryption, MSK for event streaming, Rekognition for identity verification, RDS with audit plugins, and Systems Manager for compliance",
            "EventBridge for transaction routing, Step Functions for processing, S3 Object Lock for audit trail, Comprehend for fraud detection, and Control Tower for multi-region compliance"
        ],
        correct: 0,
        explanation: {
            correct: "QLDB provides cryptographically verifiable immutable ledger perfect for audit trails, Kinesis handles million TPS with sharding, SageMaker enables custom real-time fraud models, DynamoDB provides microsecond latency for order book, and Lambda enforces country-specific rules.",
            whyWrong: {
                1: "Managed Blockchain has lower throughput and higher latency than required",
                2: "DynamoDB Streams alone doesn't provide immutability guarantees required for audit",
                3: "EventBridge cannot handle 1 million TPS and Object Lock doesn't provide ledger capabilities"
            },
            examStrategy: "QLDB is the service for immutable ledger requirements. Kinesis is the only service that scales to millions of TPS."
        }
    },

    // Domain 2: Design for New Solutions (29% = ~116 questions)
    {
        id: 'sap_021',
        domain: "Domain 2: Design for New Solutions",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "A video streaming platform needs to deliver 4K content globally to millions of users. Content is stored in S3, with new releases causing massive traffic spikes. Users complain about buffering in Asia-Pacific regions. The solution must optimize for both performance and cost.",
        question: "Which architecture provides the BEST global performance while managing costs?",
        options: [
            "CloudFront with multiple origins, S3 Transfer Acceleration for uploads, Lambda@Edge for request routing, and CloudFront origin shield in strategic regions",
            "Multiple S3 buckets with Cross-Region Replication, Application Load Balancers in each region, and Route 53 geolocation routing",
            "AWS Global Accelerator with regional S3 endpoints, EC2 Auto Scaling groups for caching, and ElastiCache Redis clusters",
            "Amazon S3 Multi-Region Access Points, CloudFront with S3 origins, and AWS Elemental MediaConvert for adaptive bitrate streaming"
        ],
        correct: 0,
        explanation: {
            correct: "CloudFront provides global edge caching, Origin Shield reduces origin load and costs during spikes, Lambda@Edge enables intelligent request routing, and Transfer Acceleration optimizes uploads. This combination offers the best performance and cost optimization.",
            whyWrong: {
                1: "ALBs and EC2 for static content delivery is expensive and less performant than CloudFront",
                2: "Global Accelerator is for dynamic content and doesn't provide caching benefits needed here",
                3: "While good, this lacks Origin Shield for spike protection and Lambda@Edge for intelligent routing"
            },
            examStrategy: "For global content delivery, CloudFront + Origin Shield + Lambda@Edge is the premium solution. Origin Shield is key for spike protection."
        }
    },
    {
        id: 'sap_022',
        domain: "Domain 2: Design for New Solutions",
        difficulty: "medium",
        timeRecommendation: 150,
        scenario: "An IoT company collects telemetry from 10 million devices sending data every 30 seconds. The data needs real-time processing for anomaly detection, storage for 7 years for compliance, and must support ad-hoc analytics. Cost optimization is critical.",
        question: "Which architecture provides the MOST cost-effective solution while meeting all requirements?",
        options: [
            "AWS IoT Core for ingestion, Kinesis Data Streams with Kinesis Analytics for real-time processing, Kinesis Firehose to S3 with Parquet conversion, and Athena for analytics",
            "API Gateway with Lambda for ingestion, DynamoDB Streams for real-time processing, DynamoDB with TTL for hot data, and S3 for cold storage",
            "AWS IoT Core, Amazon Timestream for time-series storage, AWS Lambda for anomaly detection, and QuickSight for analytics",
            "Amazon MQ for ingestion, Amazon MSK for streaming, EMR for processing, S3 with Glacier for storage, and Redshift for analytics"
        ],
        correct: 0,
        explanation: {
            correct: "This serverless architecture minimizes costs: IoT Core handles device connectivity, Kinesis provides reliable streaming, Parquet conversion reduces storage costs by 80%, S3 intelligent tiering optimizes long-term storage, and Athena enables serverless analytics.",
            whyWrong: {
                1: "DynamoDB for 7 years of IoT data would be extremely expensive, even with TTL",
                2: "Timestream is expensive for 7-year retention at this scale",
                3: "MQ, MSK, EMR, and Redshift involve significant fixed costs and management overhead"
            },
            examStrategy: "For IoT at scale: IoT Core → Kinesis → S3 (with format conversion) → Athena is the cost-optimized pattern."
        }
    },
    {
        id: 'sap_023',
        domain: "Domain 2: Design for New Solutions",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "A genomics research platform processes TB-scale datasets using complex ML pipelines. Researchers need to run various frameworks (TensorFlow, PyTorch, custom C++ code) with GPU requirements. Jobs can run for days, but are fault-tolerant and can use spot instances. The platform must support 100+ concurrent researchers.",
        question: "Which compute architecture BEST balances performance, cost, and researcher flexibility?",
        options: [
            "AWS Batch with EC2 Spot Fleet, FSx for Lustre for high-performance storage, Step Functions for workflow orchestration, and ECR for container management",
            "Amazon SageMaker with custom algorithms, SageMaker Processing for ETL, S3 for storage, and SageMaker Pipelines for orchestration",
            "EKS with Cluster Autoscaler and Spot instances, EBS GP3 volumes, Argo Workflows for orchestration, and Kubernetes Jobs for processing",
            "AWS ParallelCluster with Slurm scheduler, EFS for shared storage, EC2 Spot Fleet, and AWS Systems Manager for job submission"
        ],
        correct: 0,
        explanation: {
            correct: "AWS Batch is purpose-built for large-scale batch computing, natively supports spot instances with graceful interruption handling, FSx for Lustre provides the HPC-grade performance needed for genomics, and Step Functions handles complex multi-day workflows with built-in error handling.",
            whyWrong: {
                1: "SageMaker is optimized for ML training/inference, not general-purpose HPC workloads with custom C++ code",
                2: "EKS requires significant Kubernetes expertise and doesn't provide native HPC job scheduling features",
                3: "ParallelCluster is good for HPC but requires more management and lacks native AWS service integration"
            },
            examStrategy: "AWS Batch is the go-to for large-scale batch processing with spot instances. FSx for Lustre is the choice for HPC workloads."
        }
    },
    {
        id: 'sap_024',
        domain: "Domain 2: Design for New Solutions",
        difficulty: "medium",
        timeRecommendation: 150,
        scenario: "A social media platform needs to implement a content moderation system that checks images and text for inappropriate content before publishing. The system must handle 50,000 posts per minute during peak times with sub-second response times.",
        question: "Which architecture provides the BEST performance and scalability?",
        options: [
            "API Gateway with Lambda reserved concurrency, Amazon Rekognition for image moderation, Amazon Comprehend for text analysis, and DynamoDB for results caching",
            "Application Load Balancer with ECS Fargate, Amazon Textract for text extraction, custom ML models on SageMaker endpoints, and ElastiCache for caching",
            "CloudFront with Lambda@Edge for initial filtering, Step Functions Express Workflows for orchestration, and Amazon Augmented AI for human review",
            "Kinesis Data Streams for ingestion, Kinesis Analytics with custom ML models, S3 for temporary storage, and SNS for notifications"
        ],
        correct: 0,
        explanation: {
            correct: "This serverless architecture auto-scales to handle traffic spikes, Rekognition and Comprehend provide managed AI services with sub-second latency, Lambda reserved concurrency ensures consistent performance, and DynamoDB caching reduces repeat processing.",
            whyWrong: {
                1: "Textract is for document text extraction, not content moderation, and Fargate has cold start delays",
                2: "Lambda@Edge has size and timeout limitations not suitable for complex moderation tasks",
                3: "Kinesis Analytics isn't designed for synchronous request-response patterns needed here"
            },
            examStrategy: "For real-time AI/ML processing at scale, combine API Gateway + Lambda + managed AI services (Rekognition, Comprehend, etc.)."
        }
    },
    {
        id: 'sap_025',
        domain: "Domain 2: Design for New Solutions",
        difficulty: "medium",
        timeRecommendation: 120,
        scenario: "A fintech startup is building a payment processing system requiring exactly-once processing, audit trails for 10 years, PCI compliance, and the ability to handle 100,000 transactions per second during Black Friday.",
        question: "Which combination of services ensures reliability and compliance?",
        options: [
            "SQS FIFO queues with deduplication, DynamoDB with point-in-time recovery, X-Ray for tracing, and S3 with Object Lock for audit trails",
            "Amazon MQ with message deduplication, Aurora PostgreSQL with encryption, AWS CloudTrail with S3 lifecycle policies, and AWS WAF for PCI compliance",
            "Kinesis Data Streams with Lambda, RDS Multi-AZ with automated backups, CloudWatch Logs with S3 export, and AWS Shield for DDoS protection",
            "EventBridge with replay capability, Aurora Serverless v2, AWS Audit Manager for compliance tracking, and Glacier for long-term audit storage"
        ],
        correct: 0,
        explanation: {
            correct: "SQS FIFO guarantees exactly-once processing with built-in deduplication, DynamoDB handles 100K TPS easily, X-Ray provides complete transaction tracing, and S3 Object Lock ensures immutable audit trails for compliance.",
            whyWrong: {
                1: "Amazon MQ doesn't scale to 100K TPS as easily as SQS, and Aurora might struggle at peak load",
                2: "Kinesis doesn't guarantee exactly-once processing without additional complexity",
                3: "EventBridge doesn't provide exactly-once guarantees and Aurora Serverless v2 may have scaling delays"
            },
            examStrategy: "For exactly-once processing: SQS FIFO or Kinesis Data Streams with DynamoDB for idempotency. For audit trails: S3 with Object Lock."
        }
    },
    {
        id: 'sap_026',
        domain: "Domain 2: Design for New Solutions",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "A gaming company is launching a mobile game expecting 50 million players. The game requires real-time leaderboards, player matching based on skill level, and in-game chat. The solution must handle 1 million concurrent players during launch week.",
        question: "Which architecture BEST supports the real-time gaming requirements at scale?",
        options: [
            "Amazon GameLift for game servers, ElastiCache for Redis sorted sets for leaderboards, DynamoDB with GSI for player matching, and AWS AppSync for real-time chat via GraphQL subscriptions",
            "ECS Fargate for game servers, Aurora PostgreSQL for game state, SQS for matchmaking queue, and IoT Core for WebSocket connections",
            "EC2 Auto Scaling with custom game servers, RDS MySQL with read replicas for leaderboards, Lambda for matchmaking logic, and API Gateway WebSocket APIs for chat",
            "AWS Wavelength for edge computing, DynamoDB Streams for leaderboards, Kinesis Data Streams for matchmaking, and Amazon MQ for messaging"
        ],
        correct: 0,
        explanation: {
            correct: "GameLift is purpose-built for game server management with automatic scaling, Redis sorted sets are perfect for real-time leaderboards, DynamoDB GSI enables fast skill-based queries, and AppSync provides managed real-time subscriptions for chat.",
            whyWrong: {
                1: "Aurora and SQS aren't optimized for real-time gaming latency requirements",
                2: "Custom game servers require significant management overhead at this scale",
                3: "Wavelength is for mobile edge computing, not general game hosting"
            },
            examStrategy: "GameLift is AWS's managed game server solution. For leaderboards, Redis sorted sets are the industry standard pattern."
        }
    },
    {
        id: 'sap_027',
        domain: "Domain 2: Design for New Solutions",
        difficulty: "medium",
        timeRecommendation: 150,
        scenario: "A real estate platform needs to process and analyze millions of property images for feature detection (pools, solar panels, roof condition). Results must be searchable and integrated with property listings in near real-time.",
        question: "Which ML architecture provides the most efficient image analysis pipeline?",
        options: [
            "S3 event triggers Lambda, Rekognition Custom Labels for feature detection, OpenSearch for searchable metadata, and DynamoDB for property listings integration",
            "Kinesis Video Streams for image ingestion, SageMaker endpoints for inference, RDS PostgreSQL for metadata, and ElastiCache for search",
            "ECS Batch for processing, Textract for metadata extraction, Comprehend for description analysis, and CloudSearch for search functionality",
            "Step Functions for orchestration, EC2 with GPU for TensorFlow models, Elasticsearch on EC2, and Aurora for data storage"
        ],
        correct: 0,
        explanation: {
            correct: "S3 events provide serverless triggers, Rekognition Custom Labels enables training specific feature detection models without ML expertise, OpenSearch offers powerful search capabilities, and DynamoDB provides fast lookups for integration.",
            whyWrong: {
                1: "Kinesis Video Streams is for video, not image batches, adding unnecessary complexity",
                2: "Textract is for text extraction from documents, not image feature detection",
                3: "Self-managed TensorFlow on EC2 requires significant ML expertise and operational overhead"
            },
            examStrategy: "Rekognition Custom Labels is ideal for domain-specific image classification without deep ML knowledge."
        }
    },
    {
        id: 'sap_028',
        domain: "Domain 2: Design for New Solutions",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "An autonomous vehicle company needs to process 100TB of sensor data daily from test vehicles. Data includes LIDAR, camera feeds, and telemetry. The platform must support real-time monitoring, ML model training, and compliance with safety regulations requiring 10-year retention.",
        question: "Which data platform architecture handles this scale efficiently?",
        options: [
            "AWS IoT FleetWise for vehicle data collection, S3 data lake with Glue for ETL, SageMaker for model training, Athena for analysis, and S3 Intelligent-Tiering for lifecycle management",
            "Kinesis Data Streams for ingestion, EMR for processing, HDFS for storage, Deep Learning AMIs for training, and Redshift for analytics",
            "Direct Connect for data upload, EFS for shared storage, Batch for processing, EC2 P4d instances for training, and RDS for metadata",
            "Transfer Family for uploads, FSx for Lustre for high-performance storage, ParallelCluster for processing, and Glacier for archival"
        ],
        correct: 0,
        explanation: {
            correct: "IoT FleetWise is purpose-built for vehicle data, S3 provides scalable data lake storage, Glue handles ETL without managing infrastructure, SageMaker offers managed ML training, and Intelligent-Tiering automatically optimizes storage costs over 10 years.",
            whyWrong: {
                1: "HDFS on EMR is expensive for 100TB daily and requires significant management",
                2: "EFS is expensive for 100TB daily storage and not optimized for data lake patterns",
                3: "This approach lacks real-time monitoring capabilities and requires heavy infrastructure management"
            },
            examStrategy: "IoT FleetWise is the specialized service for automotive data collection. S3-based data lakes are most cost-effective for massive scale."
        }
    },
    {
        id: 'sap_029',
        domain: "Domain 2: Design for New Solutions",
        difficulty: "medium",
        timeRecommendation: 150,
        scenario: "A news organization needs to automatically generate subtitles for live broadcasts in 15 languages, create searchable transcripts, and enable content discovery across their video archive of 1 million hours.",
        question: "Which media processing architecture provides comprehensive capabilities?",
        options: [
            "AWS Elemental MediaLive for live streaming, Amazon Transcribe with real-time streaming, Amazon Translate for multi-language, and OpenSearch for transcript search",
            "Kinesis Video Streams for ingestion, Lambda for processing, Comprehend for language detection, and DynamoDB for transcript storage",
            "MediaConnect for transport, SageMaker for custom speech models, S3 for storage, and Athena for search",
            "IVS for live streaming, Textract for subtitle extraction, Polly for text-to-speech, and RDS for metadata"
        ],
        correct: 0,
        explanation: {
            correct: "MediaLive handles professional live streaming, Transcribe provides real-time streaming transcription with high accuracy, Translate handles 15+ languages, and OpenSearch enables powerful full-text search across transcripts.",
            whyWrong: {
                1: "Kinesis Video Streams lacks built-in transcription and Lambda isn't suitable for real-time video processing",
                2: "Building custom speech models is unnecessary when Transcribe provides this functionality",
                3: "IVS is for interactive streaming and Textract is for document text extraction, not speech"
            },
            examStrategy: "AWS Elemental services are for professional media workflows. Transcribe now supports real-time streaming for live captioning."
        }
    },
    {
        id: 'sap_030',
        domain: "Domain 2: Design for New Solutions",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "A pharmaceutical company needs a drug discovery platform processing molecular simulations requiring 10,000 vCPUs for burst workloads. Jobs are containerized, may run for weeks, and must maintain GxP compliance with validated environments.",
        question: "Which HPC architecture meets compliance and scale requirements?",
        options: [
            "AWS Batch with validated AMIs, FSx for Lustre for scratch space, Step Functions for workflow orchestration, CloudFormation for infrastructure as code, and CloudTrail for audit",
            "EKS with Karpenter for autoscaling, EBS volumes for storage, Argo Workflows for orchestration, and Open Policy Agent for compliance",
            "ParallelCluster with custom AMIs, EFS for shared storage, Slurm for scheduling, and Systems Manager for patch management",
            "EC2 Spot Fleet with dedicated hosts, instance store for scratch, SWF for workflows, and Config for compliance"
        ],
        correct: 0,
        explanation: {
            correct: "Batch provides managed compute with validation support, FSx for Lustre offers HPC-grade performance, Step Functions enables complex long-running workflows, CloudFormation ensures reproducible validated environments, and CloudTrail provides GxP-required audit trails.",
            whyWrong: {
                1: "EKS requires additional validation effort and Kubernetes adds complexity for HPC workloads",
                2: "ParallelCluster requires more manual validation and management for GxP compliance",
                3: "SWF is deprecated and Spot Fleet alone lacks orchestration for complex workflows"
            },
            examStrategy: "AWS Batch + FSx for Lustre is the go-to for large-scale HPC. For compliance, emphasize validated AMIs and audit trails."
        }
    },
    {
        id: 'sap_031',
        domain: "Domain 2: Design for New Solutions",
        difficulty: "medium",
        timeRecommendation: 150,
        scenario: "A logistics company needs to optimize delivery routes for 10,000 drivers daily, considering real-time traffic, weather, and package priorities. The solution must provide updates every 5 minutes and integrate with mobile apps.",
        question: "Which architecture provides real-time optimization capabilities?",
        options: [
            "Amazon Location Service for routing, Lambda for optimization logic, DynamoDB for driver state, AppSync for real-time updates to mobile apps, and EventBridge for scheduled recalculation",
            "HERE Maps API on EC2, SageMaker for route optimization, RDS for data storage, API Gateway for mobile integration, and CloudWatch Events for scheduling",
            "Route 53 for geo-routing, Batch for calculations, ElastiCache for caching, SNS for push notifications, and SQS for job queuing",
            "Google Maps API via Lambda, EMR for big data processing, S3 for results, CloudFront for API delivery, and Cognito for authentication"
        ],
        correct: 0,
        explanation: {
            correct: "Location Service provides managed routing with traffic data, Lambda enables serverless optimization, DynamoDB handles high-frequency state updates, AppSync delivers real-time updates via GraphQL subscriptions, and EventBridge triggers regular recalculations.",
            whyWrong: {
                1: "Self-managed HERE Maps adds operational overhead and costs",
                2: "Route 53 is for DNS, not route optimization, and Batch isn't suitable for 5-minute updates",
                3: "Using Google Maps API adds external dependencies and EMR is overkill for this use case"
            },
            examStrategy: "Amazon Location Service is AWS's answer to mapping/routing needs. AppSync excels at real-time mobile updates."
        }
    },
    {
        id: 'sap_032',
        domain: "Domain 2: Design for New Solutions",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "A stock trading platform requires ultra-low latency (<1ms) for order execution, must handle 5 million orders per second during market open, maintain ACID compliance, and provide real-time risk analysis.",
        question: "Which architecture achieves ultra-low latency at scale?",
        options: [
            "DynamoDB with DAX for microsecond latency, Kinesis Data Streams for order flow, Lambda with provisioned concurrency for risk checks, and TimeStream for time-series analytics",
            "ElastiCache for Redis with cluster mode, ECS on Graviton3 for processing, Aurora PostgreSQL for transactions, and QuickSight for analytics",
            "EC2 with SR-IOV and placement groups, custom in-memory database, Kafka on EC2 for messaging, and Spark for risk analysis",
            "MemoryDB for Redis as primary database, Fargate for compute, EventBridge for event routing, and Managed Streaming for Kafka"
        ],
        correct: 0,
        explanation: {
            correct: "DAX provides consistent microsecond latency, DynamoDB scales to millions of TPS, Kinesis handles high-throughput streaming, provisioned concurrency eliminates Lambda cold starts, and TimeStream is optimized for financial time-series data.",
            whyWrong: {
                1: "ElastiCache isn't a primary database and Aurora adds network latency",
                2: "Custom solutions require extensive development and don't guarantee <1ms latency",
                3: "MemoryDB has higher latency than DAX and EventBridge isn't suitable for millions of TPS"
            },
            examStrategy: "DAX is the only AWS service providing microsecond latency. DynamoDB + Kinesis handles millions of TPS."
        }
    },
    {
        id: 'sap_033',
        domain: "Domain 2: Design for New Solutions",
        difficulty: "medium",
        timeRecommendation: 150,
        scenario: "An e-learning platform needs to deliver personalized content to 10 million students, track progress in real-time, provide AI tutoring, and generate performance analytics for educators.",
        question: "Which architecture best supports personalized learning at scale?",
        options: [
            "Amazon Personalize for recommendations, DynamoDB for progress tracking, Amazon Lex for AI tutoring, QuickSight with embedded analytics for educators",
            "SageMaker for recommendation models, RDS PostgreSQL for data, Lambda for tutoring logic, and Athena for analytics",
            "ElasticSearch for content search, Aurora for user data, Comprehend for text analysis, and Redshift for analytics",
            "CloudSearch for discovery, DocumentDB for progress, Polly for audio tutoring, and EMR for analytics"
        ],
        correct: 0,
        explanation: {
            correct: "Personalize provides managed recommendation engine perfect for content personalization, DynamoDB handles millions of concurrent progress updates, Lex offers conversational AI for tutoring, and QuickSight embedded analytics integrates seamlessly for educators.",
            whyWrong: {
                1: "Building custom recommendation models requires ML expertise and longer development",
                2: "ElasticSearch alone doesn't provide personalization and Aurora may struggle with write scale",
                3: "CloudSearch is deprecated and DocumentDB isn't optimal for this use case"
            },
            examStrategy: "Amazon Personalize is the managed service for recommendation systems. Lex provides conversational AI capabilities."
        }
    },
    {
        id: 'sap_034',
        domain: "Domain 2: Design for New Solutions",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "A smart city initiative needs to process data from 100,000 IoT sensors (traffic, air quality, utilities), provide real-time dashboards for city operations, enable predictive maintenance, and open data APIs for citizens.",
        question: "Which IoT platform architecture scales to city-wide deployment?",
        options: [
            "AWS IoT Core for device management, IoT Analytics for processing, IoT SiteWise for asset modeling, QuickSight for dashboards, and API Gateway for public APIs",
            "Kinesis Data Streams for ingestion, EMR for processing, S3 data lake, Grafana on EC2, and Lambda for APIs",
            "MQTT on EC2, Spark Streaming for processing, Cassandra for storage, Kibana for visualization, and Express.js for APIs",
            "IoT Greengrass for edge processing, MSK for streaming, Redshift for analytics, Tableau for dashboards, and AppSync for APIs"
        ],
        correct: 0,
        explanation: {
            correct: "IoT Core handles massive device fleets, IoT Analytics provides managed analytics, SiteWise models industrial assets for cities, QuickSight offers embeddable dashboards, and API Gateway provides scalable public APIs.",
            whyWrong: {
                1: "Building with Kinesis/EMR requires more management and lacks IoT-specific features",
                2: "Self-managed MQTT doesn't scale to 100,000 devices efficiently",
                3: "Greengrass is for edge but the question focuses on cloud platform"
            },
            examStrategy: "AWS IoT suite provides purpose-built services for IoT scenarios. IoT SiteWise is key for industrial/city asset modeling."
        }
    },
    {
        id: 'sap_035',
        domain: "Domain 2: Design for New Solutions",
        difficulty: "medium",
        timeRecommendation: 150,
        scenario: "A retail chain needs to implement computer vision for self-checkout, detecting unscanned items, age verification for restricted products, and loss prevention. The solution must work across 5,000 stores with varying internet connectivity.",
        question: "Which edge AI architecture provides reliable in-store processing?",
        options: [
            "AWS Panorama for edge computer vision, IoT Greengrass for device management, S3 for model updates, and IoT Analytics for aggregated insights",
            "Rekognition API calls from stores, Lambda for processing, DynamoDB for alerts, and CloudWatch for monitoring",
            "SageMaker Neo for model optimization, EC2 instances in stores, VPN connections, and Kinesis for data streaming",
            "DeepLens cameras, IoT Core for connectivity, Batch for processing, and QuickSight for analytics"
        ],
        correct: 0,
        explanation: {
            correct: "Panorama provides purpose-built edge computer vision appliances perfect for retail, Greengrass manages edge deployments and works offline, S3 enables centralized model updates, and IoT Analytics aggregates insights from all stores.",
            whyWrong: {
                1: "Cloud API calls fail with poor connectivity and add latency for real-time detection",
                2: "Managing EC2 instances in 5,000 stores is operationally complex",
                3: "DeepLens is discontinued and was for development, not production deployment"
            },
            examStrategy: "AWS Panorama is the service for computer vision at the edge. Greengrass enables offline operation for edge scenarios."
        }
    },
    {
        id: 'sap_036',
        domain: "Domain 2: Design for New Solutions",
        difficulty: "hard",
        timeRecommendation: 180,
        scenario: "A cryptocurrency exchange needs to process 1 million transactions per second, maintain an immutable audit trail, detect fraud in real-time, and comply with regulations in 30 countries.",
        question: "Which architecture meets these demanding requirements?",
        options: [
            "Amazon QLDB for immutable ledger, Kinesis Data Streams for transaction processing, SageMaker for fraud detection, DynamoDB for order book, and Lambda for compliance rules per country",
            "Managed Blockchain for immutability, API Gateway for transactions, Fraud Detector for anomaly detection, Aurora for order matching, and Config for compliance",
            "DynamoDB Streams with KMS encryption, MSK for event streaming, Rekognition for identity verification, RDS with audit plugins, and Systems Manager for compliance",
            "EventBridge for transaction routing, Step Functions for processing, S3 Object Lock for audit trail, Comprehend for fraud detection, and Control Tower for multi-region compliance"
        ],
        correct: 0,
        explanation: {
            correct: "QLDB provides cryptographically verifiable immutable ledger perfect for audit trails, Kinesis handles million TPS with sharding, SageMaker enables custom real-time fraud models, DynamoDB provides microsecond latency for order book, and Lambda enforces country-specific rules.",
            whyWrong: {
                1: "Managed Blockchain has lower throughput and higher latency than required",
                2: "DynamoDB Streams alone doesn't provide immutable audit trail guarantees. Rekognition is for image/video analysis, not transaction fraud detection.",
     3: "S3 Object Lock provides immutability but not the performance for real-time audit trails. Comprehend is for NLP, not fraud detection. Step Functions adds too much latency for million TPS."
   }
 }, 
{
  id: 'sap_037',
  domain: "Domain 1: Design Solutions for Organizational Complexity",
  difficulty: "hard",
  timeRecommendation: 180,
  scenario: "A multinational corporation with 50 AWS accounts across 5 business units needs to implement a zero-trust security model. They require centralized identity management, network isolation between business units, encrypted data sharing capabilities, and compliance with SOC 2, HIPAA, and GDPR across different regions.",
  question: "Which architecture provides the most comprehensive zero-trust implementation while maintaining operational efficiency?",
  options: [
    "AWS SSO with external IdP integration, Transit Gateway with route table segregation, AWS RAM for cross-account sharing, Macie for data classification, and Security Hub with custom compliance frameworks per region",
    "Cognito for centralized authentication, PrivateLink endpoints in each account, S3 bucket policies for data sharing, GuardDuty for threat detection, and Config conformance packs",
    "IAM Identity Center with permission sets, AWS Network Firewall with domain filtering, Lake Formation for data governance, Detective for investigation, and Audit Manager for compliance",
    "Directory Service with MFA, VPC peering with security groups, DataSync for data transfer, CloudTrail Lake for analysis, and Control Tower with guardrails"
  ],
  correct: 0,
  explanation: {
    correct: "AWS SSO (Identity Center) with external IdP provides true centralized identity with SAML/OIDC. Transit Gateway with route segregation enables network isolation and inspection. RAM enables secure resource sharing with encryption. Macie classifies sensitive data for compliance. Security Hub aggregates compliance across accounts with regional requirements.",
    whyWrong: {
      1: "Cognito is for application users, not enterprise workforce. PrivateLink alone doesn't provide network segmentation between business units.",
      2: "Network Firewall is good but doesn't address the identity federation requirement. Lake Formation is for data lakes specifically, not general data sharing.",
      3: "Directory Service doesn't provide modern zero-trust capabilities. VPC peering creates a mesh that's hard to manage at scale and doesn't provide inspection."
    },
	  examStrategy: "For zero-trust architecture: AWS SSO (Identity Center) for identity, Transit Gateway for network segmentation, RAM for secure sharing, Security Hub for compliance aggregation."
    }
  },
   {
    id: 'sap_038',
    domain: "Domain 2: Design for New Solutions",
    difficulty: "medium",
    timeRecommendation: 120,
    scenario: "A gaming company is launching a real-time multiplayer game expecting 10 million concurrent players. The game requires <50ms latency globally, player session state management, real-time leaderboards, and the ability to handle 100,000 new connections per second during launch events.",
    question: "What architecture best supports these real-time gaming requirements?",
    options: [
      "GameLift FlexMatch for matchmaking, DynamoDB global tables for session state, ElastiCache for leaderboards, API Gateway WebSocket APIs for connections",
      "Global Accelerator for anycast routing, AppSync with subscriptions for real-time updates, DAX for session caching, Kinesis Data Analytics for leaderboards",
      "CloudFront with Lambda@Edge for routing, MemoryDB for session state, Timestream for leaderboards, IoT Core for WebSocket connections",
      "Route 53 geoproximity routing, ECS with Service Discovery, Redis cluster for all caching needs, ALB with sticky sessions"
    ],
    correct: 0,
    explanation: {
      correct: "GameLift FlexMatch is purpose-built for game matchmaking with low latency. DynamoDB global tables provide multi-region session state with single-digit millisecond performance. ElastiCache offers sorted sets perfect for real-time leaderboards. API Gateway WebSocket handles massive concurrent connections with automatic scaling.",
      whyWrong: {
        1: "AppSync is for GraphQL and not optimized for gaming latency. Kinesis Analytics adds unnecessary complexity for simple leaderboards.",
        2: "IoT Core is not designed for gaming connections. Timestream is for time-series data, overkill for leaderboards.",
        3: "ALB doesn't support WebSocket at the scale needed. ECS adds operational overhead compared to managed services."
      }
  },

  {
    id: 'sap_039',
    domain: "Domain 3: Continuous Improvement for Existing Solutions",
    difficulty: "hard",
    timeRecommendation: 150,
    scenario: "An e-commerce platform running on EC2 with RDS MySQL is experiencing 40% increased costs and performance degradation. Current architecture: 50 m5.xlarge instances, Multi-AZ RDS db.r5.4xlarge, CloudFront, and S3. Monthly bill is $45,000 with 60% idle capacity during off-peak hours.",
    question: "Which optimization strategy provides the best cost-performance improvement?",
    options: [
      "Migrate to ECS Fargate with Spot capacity, Aurora Serverless v2, implement S3 Intelligent-Tiering, use Lambda@Edge for dynamic content, and Compute Savings Plans",
      "Switch to EC2 Spot Fleet with mixed instances, Aurora MySQL with read replicas, enable RDS Proxy, implement CloudFront caching policies, and Reserved Instances",
      "Containerize on EKS with Karpenter autoscaling, Aurora Global Database, use ElastiCache for session management, CloudFront Origin Shield, and Savings Plans",
      "Implement Auto Scaling with predictive scaling, convert to Aurora PostgreSQL, add DAX caching layer, optimize CloudFront behaviors, and Spot Instances for batch processing"
    ],
    correct: 0,
    explanation: {
      correct: "Fargate eliminates idle EC2 capacity with per-second billing. Aurora Serverless v2 auto-scales database capacity reducing costs by 50%+. S3 Intelligent-Tiering optimizes storage costs. Lambda@Edge reduces backend load. Compute Savings Plans provide 66% discount on Fargate.",
      whyWrong: {
        1: "Spot Fleet risks availability issues for production web servers. RDS Proxy adds cost without solving the core scaling problem.",
        2: "EKS with Karpenter is complex and adds management overhead. Aurora Global is expensive overkill for a single-region e-commerce site.",
        3: "Predictive scaling helps but doesn't eliminate idle capacity like serverless. DAX is unnecessary cost if not using DynamoDB."
      }
  },

  {
    id: 'sap_040',
    domain: "Domain 4: Accelerate Workload Migration and Modernization",
    difficulty: "medium",
    timeRecommendation: 120,
    scenario: "A financial services company needs to migrate 500TB of on-premises Oracle databases to AWS within 3 months. They require minimal downtime (<1 hour), must maintain ACID compliance, need to preserve stored procedures, and want to reduce Oracle licensing costs by 70%.",
    question: "What migration strategy best meets these requirements?",
    options: [
      "Use DMS with CDC for continuous replication to Aurora PostgreSQL, SCT for schema conversion, Lambda for stored procedure migration, and perform cutover during maintenance window",
      "AWS DataSync for initial load to RDS Oracle, then Golden Gate for replication, gradually migrate stored procedures, and switch to Aurora PostgreSQL post-migration",
      "Database Migration Accelerator to RDS Custom for Oracle, maintain procedures as-is, then re-platform to Babelfish for Aurora PostgreSQL to reduce licenses",
      "Snowball Edge for initial transfer, DMS for ongoing sync to RDS Oracle, manually convert procedures, then use Blue/Green deployment to Aurora"
    ],
    correct: 2,
    explanation: {
      correct: "RDS Custom for Oracle allows immediate migration with full Oracle compatibility. Babelfish for Aurora PostgreSQL enables running Oracle workloads on PostgreSQL, eliminating 70% of Oracle licenses while maintaining stored procedures and ACID compliance with minimal code changes.",
      whyWrong: {
        0: "SCT and Lambda conversion of stored procedures would take longer than 3 months for 500TB of databases with complex procedures.",
        1: "DataSync is for file storage, not databases. Golden Gate adds complexity and licensing costs.",
        3: "Snowball Edge adds unnecessary time. Blue/Green deployment doesn't address the stored procedure compatibility issue."
      }
  },

  {
    id: 'sap_041',
    domain: "Domain 2: Design for New Solutions",
    difficulty: "hard",
    timeRecommendation: 180,
    scenario: "A biotech company needs to process genomic sequencing data: 100TB daily input, HIPAA compliant, 99.999% durability, support for 10,000 concurrent analysis jobs, real-time collaboration between 5 global research centers, and 7-year retention with instant retrieval for the first year.",
    question: "Which architecture best handles these genomic data processing requirements?",
    options: [
      "S3 with Object Lock for compliance, Batch for job orchestration, FSx for Lustre for high-performance computing, Transfer Family for data ingestion, and Intelligent-Tiering for lifecycle management",
      "S3 Glacier Instant Retrieval after 1 year, EMR for processing, EFS for shared storage, DataSync for transfer, and Macie for compliance scanning",
      "S3 Standard with versioning, ParallelCluster for HPC, EBS Multi-Attach for shared data, Direct Connect for transfers, and Backup for long-term retention",
      "S3 Outposts for edge processing, Glue for ETL, FSx for Windows for collaboration, Storage Gateway for ingestion, and Glacier Deep Archive for retention"
    ],
    correct: 0,
    explanation: {
      correct: "S3 Object Lock ensures HIPAA compliance with immutability. Batch efficiently orchestrates 10,000 concurrent jobs. FSx for Lustre provides the massive parallel processing needed for genomics. Transfer Family handles secure multi-site uploads. Intelligent-Tiering automatically moves data to Glacier after 1 year while maintaining instant retrieval for recent data.",
      whyWrong: {
        1: "EMR is for big data analytics, not optimized for genomic HPC workloads. EFS lacks the performance for massive parallel genomic processing.",
        2: "EBS Multi-Attach is limited to 16 instances, insufficient for 10,000 jobs. ParallelCluster adds management overhead.",
        3: "Outposts unnecessary for this use case. FSx for Windows not optimized for genomic workloads. Glacier Deep Archive has 12-hour retrieval time."
	  },
		examStrategy: "For genomic/biotech workloads: S3 Object Lock for HIPAA compliance, Batch for job orchestration at scale, FSx for Lustre for HPC performance."
      }
	 },
	 
	// Continuing the question bank...
{
    id: 'sap_042',
    domain: "Domain 2: Design for New Solutions",
    difficulty: "hard",
    timeRecommendation: 180,
    scenario: "A global media company is building a new video streaming platform expecting 100 million users. The platform needs to deliver live sports events with <3 second latency, support 4K/8K video, handle 10 million concurrent viewers during major events, and provide personalized content recommendations. The architecture must support multiple regions with local content regulations.",
    question: "Which architecture provides the MOST scalable and performant solution?",
    options: [
        "Amazon CloudFront with AWS Elemental MediaStore as origin, AWS Elemental MediaLive for encoding, Amazon DynamoDB Global Tables for user profiles, Amazon Personalize for recommendations, and Amazon Kinesis Data Analytics for real-time analytics",
        "Amazon CloudFront with multiple origins, AWS Elemental MediaPackage for just-in-time packaging, Amazon ElastiCache for session data, Amazon SageMaker for ML recommendations, and Amazon Redshift for analytics",
        "AWS Global Accelerator with Amazon EC2 instances running Wowza, Amazon Aurora Global Database for user data, AWS Lambda@Edge for personalization, and Amazon EMR for analytics processing",
        "Amazon CloudFront with AWS Elemental MediaConnect for transport, Amazon ECS with custom streaming servers, Amazon Neptune for recommendation graph, and Amazon Timestream for time-series analytics"
    ],
    correct: 0,
    explanation: {
        correct: "This combination provides ultra-low latency streaming (MediaStore + CloudFront), professional live encoding (MediaLive), globally distributed user data (DynamoDB Global Tables), managed ML recommendations (Personalize), and real-time analytics (Kinesis Data Analytics) - optimal for massive scale live streaming.",
        whyWrong: {
            1: "MediaPackage adds packaging latency not suitable for <3 second requirement, and Redshift isn't ideal for real-time analytics",
            2: "EC2-based streaming lacks the managed scaling and low latency of AWS Elemental services, and Lambda@Edge has limitations for complex personalization",
            3: "MediaConnect is for contribution not distribution, and ECS-based custom servers won't match managed service performance at this scale"
        },
        examStrategy: "For ultra-low latency live streaming at scale, AWS Elemental MediaStore + MediaLive + CloudFront is the go-to combination. Remember MediaStore is optimized for live video origination with consistent low latency."
    }
},
{
    id: 'sap_043',
    domain: "Domain 3: Continuous Improvement for Existing Solutions",
    difficulty: "hard",
    timeRecommendation: 180,
    scenario: "A financial institution runs a monolithic Java application on 20 m5.24xlarge EC2 instances with Oracle Database on RDS. The application handles loan processing with strict SLA requirements (99.99% availability). Monthly AWS costs exceed $500,000. Performance analysis shows CPU utilization averages 30%, memory at 40%, but certain batch jobs require full resources for 4 hours nightly. The database shows hot partitions during month-end processing.",
    question: "Which optimization strategy provides the BEST cost reduction while maintaining SLAs?",
    options: [
        "Implement EC2 Auto Scaling with scheduled actions for batch processing, migrate to Aurora PostgreSQL with read replicas, use EC2 Instance Savings Plans, and implement application caching with ElastiCache",
        "Containerize with ECS on EC2 Spot Fleet with Spot Fleet management, implement database sharding on current RDS Oracle, use Reserved Instances, and add CloudFront for static content",
        "Migrate to EKS with Karpenter for intelligent scaling, implement Aurora Serverless v2 for variable workloads, use Compute Savings Plans, and implement database connection pooling with RDS Proxy",
        "Decompose into microservices on Lambda for transactional workloads, keep EC2 for batch jobs with Spot instances, migrate to DynamoDB with proper partition key design, and implement API caching with API Gateway"
    ],
    correct: 2,
    explanation: {
        correct: "EKS with Karpenter provides intelligent right-sizing and scaling, Aurora Serverless v2 handles variable database loads cost-effectively, Compute Savings Plans offer flexibility across services, and RDS Proxy reduces connection overhead - maintaining high availability while optimizing costs.",
        whyWrong: {
            0: "Auto Scaling helps but doesn't address oversized instances, and PostgreSQL migration might break Oracle-specific features required for financial applications",
            1: "Spot Fleet for critical financial workloads risks SLA violations, and Oracle sharding is complex without addressing the core cost issue",
            3: "Full Lambda migration is too aggressive for monolithic app, DynamoDB may not suit complex financial queries, and mixing architectures increases complexity"
        },
        examStrategy: "For monolithic optimization: containerization (not full microservices) provides better resource utilization. Aurora Serverless v2 excels at variable workloads. Karpenter is the modern solution for Kubernetes autoscaling."
    }
},
{
    id: 'sap_044',
    domain: "Domain 4: Accelerate Workload Migration and Modernization",
    difficulty: "hard",
    timeRecommendation: 180,
    scenario: "A healthcare company needs to migrate 500TB of medical imaging data from on-premises NAS to AWS. The data must remain accessible during migration with <100ms latency for recent data (last 30 days, ~50TB). Compliance requires encryption in transit and at rest, with audit logging. Network bandwidth is 1Gbps dedicated for migration. Post-migration, the solution must support AI/ML workloads for image analysis.",
    question: "Which migration strategy ensures continuous access while optimizing for future ML workloads?",
    options: [
        "AWS DataSync for initial transfer, AWS Storage Gateway File Gateway for hybrid access during migration, Amazon S3 Intelligent-Tiering for storage, and AWS HealthLake for FHIR compliance with Amazon SageMaker for ML",
        "AWS Direct Connect with AWS Storage Gateway Volume Gateway in cached mode, ongoing replication to Amazon S3, post-migration transition to Amazon FSx for Lustre with S3 integration for ML processing",
        "AWS Snowball Edge for bulk transfer, AWS Storage Gateway File Gateway for recent data access, migration to Amazon EFS with lifecycle management, and Amazon Rekognition for image analysis",
        "AWS Database Migration Service with Large Object support, Amazon S3 with Transfer Acceleration, AWS Lambda for access patterns monitoring, and Amazon Textract with custom ML models"
    ],
    correct: 1,
    explanation: {
        correct: "Direct Connect ensures reliable transfer, Volume Gateway cached mode provides low-latency access to hot data while migrating, S3 serves as durable storage, and FSx for Lustre offers high-performance computing ideal for ML workloads with native S3 integration.",
        whyWrong: {
            0: "DataSync alone can't maintain <100ms latency during migration, and HealthLake is for FHIR data not imaging files",
            2: "Snowball Edge creates accessibility gaps during shipping, and EFS isn't optimized for ML workloads compared to FSx for Lustre",
            3: "DMS isn't designed for file migration, and Textract is for document processing not medical imaging"
        },
        examStrategy: "For large-scale migrations with continuous access requirements, Storage Gateway in cached mode is key. For ML/HPC workloads on file data, FSx for Lustre with S3 integration is the optimal choice."
    }
},
{
    id: 'sap_045',
    domain: "Domain 1: Design Solutions for Organizational Complexity",
    difficulty: "hard",
    timeRecommendation: 180,
    scenario: "A global retail company with 200 stores operates separate AWS accounts per region (15 accounts total). Each region has different compliance requirements, payment providers, and inventory systems. The company needs to implement a unified data lake for global analytics, centralized security monitoring, and cross-region inventory visibility while respecting data residency laws that prohibit certain data from leaving specific countries.",
    question: "Which architecture BEST addresses these multi-region compliance and integration requirements?",
    options: [
        "AWS Lake Formation with cross-account permissions, AWS Glue DataBrew for PII detection and masking, Amazon Macie for data classification, federated queries with Amazon Athena, and AWS DataSync with data residency rules",
        "Amazon DataZone for data mesh architecture, AWS Clean Rooms for privacy-preserving analytics, Amazon S3 with Object Lock for compliance, AWS Glue ETL with data lineage, and Amazon Redshift data sharing",
        "Centralized S3 bucket with bucket policies per region, AWS Glue crawlers for cataloging, Amazon EMR for processing, AWS Lambda for data transformation, and Amazon QuickSight with row-level security",
        "Hub-and-spoke architecture with AWS PrivateLink, Amazon MSK for event streaming, Amazon Kinesis Data Firehose for ingestion, Amazon OpenSearch for analytics, and AWS Config for compliance tracking"
    ],
    correct: 1,
    explanation: {
        correct: "DataZone enables federated data mesh architecture respecting boundaries, Clean Rooms allows analytics without moving sensitive data, S3 Object Lock ensures compliance, Glue provides lineage for audit, and Redshift data sharing enables cross-region analytics without violating residency laws.",
        whyWrong: {
            0: "Lake Formation doesn't inherently solve data residency issues, and DataSync would violate data movement restrictions",
            2: "Centralized bucket architecture directly violates data residency requirements for certain countries",
            3: "MSK and streaming architecture doesn't address the core requirement of maintaining data residency while enabling analytics"
        },
        examStrategy: "For data residency compliance with analytics needs, look for solutions that process data in-place (Clean Rooms, data sharing) rather than centralizing data movement. DataZone is AWS's answer to data mesh architecture."
    }
},
{
    id: 'sap_046',
    domain: "Domain 2: Design for New Solutions",
    difficulty: "hard",
    timeRecommendation: 180,
    scenario: "A autonomous vehicle company is designing a platform to process sensor data from 50,000 vehicles. Each vehicle generates 4TB of data daily including video, LIDAR, and telemetry. The platform must support real-time safety alerts (<500ms), batch processing for model training, handle 100Gbps peak ingestion, provide 11 9's durability for crash investigation data, and support replay of any time window for simulation.",
    question: "Which architecture meets these extreme scale and performance requirements?",
    options: [
        "AWS IoT Core for device management, Amazon Kinesis Data Streams with 10,000 shards for ingestion, Amazon S3 Express One Zone for hot data, S3 Glacier Instant Retrieval for cold data, Amazon EMR for batch processing, and Amazon Managed Service for Apache Flink for real-time processing",
        "AWS IoT FleetWise for vehicle data collection, Amazon Managed Streaming for Apache Kafka (MSK) with tiered storage, Amazon S3 with Intelligent-Tiering, AWS Batch for processing, Amazon SageMaker for model training, and Amazon Timestream for time-series queries",
        "AWS Direct Connect with multiple VIFs, Amazon Kinesis Data Firehose with record format conversion, Amazon S3 with cross-region replication, AWS Lambda for real-time alerts, Amazon Redshift for analytics, and AWS Glue for ETL",
        "AWS IoT Greengrass for edge processing, Amazon MSK Serverless for streaming, Amazon EFS for temporary storage, Amazon S3 Standard-IA for archival, Amazon EKS with GPU nodes for processing, and Amazon Neptune for relationship analysis"
    ],
    correct: 1,
    explanation: {
        correct: "IoT FleetWise is purpose-built for vehicle data, MSK with tiered storage handles massive throughput with replay capability, S3 Intelligent-Tiering optimizes storage costs, Batch handles large-scale processing, SageMaker supports model training, and Timestream enables efficient time-based queries for any window.",
        whyWrong: {
            0: "S3 Express One Zone doesn't provide 11 9's durability (only 99.999999999% requires multiple zones), and 10,000 Kinesis shards would be extremely expensive",
            2: "Kinesis Data Firehose has latency (minimum 60 seconds) incompatible with <500ms alerts, and Lambda has payload limitations for video processing",
            3: "EFS isn't suitable for 100Gbps ingestion rates, and MSK Serverless has throughput limitations for this scale"
        },
        examStrategy: "For automotive/IoT scenarios, IoT FleetWise is the specialized service. MSK with tiered storage provides Kafka compatibility with replay capabilities. For 11 9's durability, ensure multi-AZ or multi-region storage."
    }
},
{
    id: 'sap_047',
    domain: "Domain 3: Continuous Improvement for Existing Solutions",
    difficulty: "medium",
    timeRecommendation: 150,
    scenario: "An e-commerce platform on AWS experiences 70% lower traffic during nights and weekends. The current architecture uses 40 c5.2xlarge EC2 instances in an Auto Scaling group, RDS MySQL Multi-AZ (db.r5.8xlarge), and ElastiCache Redis cluster with 6 cache.m5.xlarge nodes. Monthly costs are $125,000. The platform maintains session state in ElastiCache and serves both web and API traffic.",
    question: "Which optimization approach would provide the MOST cost savings while maintaining performance?",
    options: [
        "Convert EC2 instances to Spot Fleet with mixed instance types, implement Aurora Serverless v1, reduce ElastiCache nodes with auto-discovery, and separate web/API into different target groups",
        "Implement predictive scaling for EC2, migrate to Aurora MySQL with auto-scaling replicas, use ElastiCache for Redis with auto-scaling, and implement Savings Plans for compute",
        "Containerize on Fargate Spot for stateless workloads, keep RDS but downsize with scheduled scaling, implement DynamoDB for session state, and use CloudFront to reduce backend load",
        "Move to EC2 t3.xlarge with unlimited mode, implement Aurora Global Database, replace ElastiCache with DynamoDB Accelerator (DAX), and implement request throttling"
    ],
    correct: 1,
    explanation: {
        correct: "Predictive scaling anticipates traffic patterns for optimal cost, Aurora with auto-scaling replicas provides better price-performance than RDS, ElastiCache auto-scaling adjusts to demand, and Savings Plans provide 72% discounts while maintaining flexibility for the predictable baseline load.",
        whyWrong: {
            0: "Spot Fleet risks availability issues for customer-facing e-commerce, and Aurora Serverless v1 has cold start issues",
            2: "Fargate Spot isn't suitable for customer-facing workloads, and migrating session state to DynamoDB requires application changes",
            3: "T3 instances may not handle peak loads efficiently, Aurora Global is unnecessary overhead for single-region, and DAX is for DynamoDB not a Redis replacement"
        },
        examStrategy: "For predictable traffic patterns, predictive scaling + Savings Plans is optimal. Aurora MySQL with replicas offers better scaling than RDS Multi-AZ. Maintain architectural stability while optimizing costs."
    }
},
{
    id: 'sap_048',
    domain: "Domain 4: Accelerate Workload Migration and Modernization",
    difficulty: "hard",
    timeRecommendation: 180,
    scenario: "A government agency must migrate a 15-year-old mainframe COBOL system processing citizen benefits to AWS. The system handles 5 million transactions daily, integrates with 50 other systems via MQ and file transfers, has 400TB of DB2 data, and must maintain bit-for-bit compatibility for regulatory audit. Zero downtime is required, and the migration must complete within 6 months.",
    question: "Which migration strategy ensures compatibility and zero downtime?",
    options: [
        "AWS Mainframe Modernization Service with Micro Focus for COBOL runtime, AWS SCT for DB2 to Aurora PostgreSQL migration, Amazon MQ for message queue compatibility, AWS DataSync for file transfer migration, and parallel run validation",
        "AWS Mainframe Modernization Service with automated refactoring to Java, DMS with CDC for DB2 to RDS migration, Amazon SQS to replace MQ, AWS Transfer Family for file protocols, and blue-green deployment",
        "Containerize COBOL applications using OpenShift on EKS, migrate DB2 to Amazon RDS for Db2, implement Amazon MSK for messaging, AWS Direct Connect for hybrid connectivity, and phased cutover approach",
        "EC2 instances with COBOL compilers, lift-and-shift DB2 to EC2, Amazon MQ for JMS compatibility, AWS Storage Gateway for file systems, and database replication with GoldenGate"
    ],
    correct: 0,
    explanation: {
        correct: "AWS Mainframe Modernization with Micro Focus maintains COBOL compatibility ensuring bit-for-bit accuracy, SCT handles complex DB2 migration, Amazon MQ provides native MQ protocol support, DataSync manages file migrations, and parallel run enables zero-downtime validation.",
        whyWrong: {
            1: "Automated refactoring to Java cannot guarantee bit-for-bit compatibility required for regulatory audit",
            2: "OpenShift on EKS adds unnecessary complexity, and RDS for Db2 has limitations for mainframe DB2 features",
            3: "Manual EC2 approach lacks mainframe-specific features and GoldenGate licensing adds complexity and cost"
        },
        examStrategy: "For mainframe migrations requiring compatibility, AWS Mainframe Modernization Service is purpose-built. Micro Focus runtime maintains COBOL execution compatibility. Amazon MQ preserves message protocol compatibility."
    }
},
{
    id: 'sap_049',
    domain: "Domain 1: Design Solutions for Organizational Complexity",
    difficulty: "hard",
    timeRecommendation: 180,
    scenario: "A multinational bank operates in 30 countries with strict data sovereignty laws. Each country has its own AWS account with local applications and databases. The bank needs to implement global fraud detection that analyzes patterns across all regions in real-time, while ensuring no personally identifiable information (PII) leaves its country of origin. The solution must also provide unified reporting for regulators.",
    question: "Which architecture BEST balances global fraud detection with data sovereignty requirements?",
    options: [
        "Implement federated learning with Amazon SageMaker where models are trained locally and only model parameters are shared globally, use AWS Clean Rooms for cross-border analytics without data movement, and Amazon DataZone for governance",
        "Deploy Amazon Fraud Detector in each region with shared model artifacts, use AWS PrivateLink for secure connectivity, aggregate anonymized metrics in a central account, and implement AWS CloudFormation StackSets for consistent deployment",
        "Use Amazon Macie to identify and tokenize PII, replicate tokenized data to central region with DMS, implement Amazon Neptune for fraud graph analysis, and use AWS Lake Formation for access control",
        "Implement event sourcing with Amazon EventBridge global endpoints, process with Lambda@Edge for data localization, analyze with Amazon OpenSearch cross-cluster replication, and report with Amazon QuickSight SPICE"
    ],
    correct: 0,
    explanation: {
        correct: "Federated learning with SageMaker allows model training on local data without moving it, sharing only parameters preserves privacy, Clean Rooms enables privacy-preserving analytics across borders without raw data movement, and DataZone provides unified governance while respecting boundaries.",
        whyWrong: {
            1: "Sharing model artifacts might leak information about local data patterns, and anonymized metrics may not be sufficient for sophisticated fraud detection",
            2: "Tokenization and central replication still involves moving derived PII data, which may violate strict sovereignty laws",
            3: "EventBridge and cross-cluster replication would require data movement across borders, violating sovereignty requirements"
        },
        examStrategy: "For data sovereignty with global analytics, federated learning and Clean Rooms are key AWS services. They enable insights without data movement. DataZone provides governance for distributed data architectures."
    }
},
{
    id: 'sap_050',
    domain: "Domain 2: Design for New Solutions",
    difficulty: "hard",
    timeRecommendation: 180,
    scenario: "A genomics research company is building a platform to analyze DNA sequences. Each analysis job processes 100GB files, requires 128 vCPUs and 1TB RAM for 4-6 hours, runs complex bioinformatics pipelines with 50+ steps, needs access to a 10TB reference genome database, and must support 1000 concurrent analyses. Results must be available for 7 years with sub-second query response for the first year.",
    question: "Which architecture provides the MOST cost-effective and scalable solution?",
    options: [
        "AWS Batch with EC2 Spot instances, Amazon FSx for Lustre for scratch space, Amazon S3 for input/output, AWS Step Functions for pipeline orchestration, Amazon RDS for metadata, and S3 Intelligent-Tiering for long-term storage",
        "Amazon ECS with Fargate for compute, Amazon EFS for shared storage, AWS Glue for ETL pipelines, Amazon DynamoDB for job tracking, Amazon Athena for queries, and S3 Glacier Deep Archive for archival",
        "Amazon EMR with Spot instances for processing, HDFS for temporary storage, AWS Data Pipeline for orchestration, Amazon Redshift for analytics, Amazon ElastiCache for reference data, and S3 lifecycle policies",
        "AWS ParallelCluster with Slurm scheduler, Amazon FSx for Lustre linked to S3, AWS Batch for job submission, Amazon Aurora for results database, and S3 Standard-IA with Glacier transition"
    ],
    correct: 0,
    explanation: {
        correct: "AWS Batch with Spot handles large-scale compute cost-effectively, FSx for Lustre provides high-performance scratch space essential for genomics, Step Functions orchestrates complex pipelines, S3 offers durable storage, and Intelligent-Tiering automatically optimizes storage costs over 7 years.",
        whyWrong: {
            1: "Fargate has 200GB storage limit insufficient for genomics workloads, and EFS performance doesn't match FSx for Lustre for this use case",
            2: "EMR is optimized for data analytics not bioinformatics pipelines, and Data Pipeline is being deprecated in favor of Step Functions",
            3: "ParallelCluster adds management overhead, and mixing Batch with ParallelCluster creates unnecessary complexity"
        },
        examStrategy: "For HPC/genomics workloads: AWS Batch + FSx for Lustre is the standard pattern. Step Functions excels at complex pipeline orchestration. Spot instances provide massive cost savings for batch workloads."
    }
};
// Continuing questions 51-60...
{
   id: 'sap_051',
   domain: "Domain 3: Continuous Improvement for Existing Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A SaaS company's multi-tenant application uses a single RDS PostgreSQL instance (db.r6g.16xlarge) with 15,000 schemas (one per customer). Database performance has degraded with connection pool exhaustion, slow schema migrations taking 48 hours, backup times exceeding 6 hours, and cross-tenant query latency affecting large customers. The company needs to improve performance while preparing for 10x growth.",
   question: "Which modernization strategy BEST addresses the current issues and enables future scaling?",
   options: [
       "Migrate to Aurora PostgreSQL with write-through caching in ElastiCache, implement RDS Proxy for connection pooling, use Blue/Green deployments for schema changes, and partition large tenant data",
       "Implement database-per-tenant with Aurora Serverless v2, use AWS Lambda for schema migrations, implement Amazon DynamoDB for hot data, and consolidate with Amazon Redshift for analytics",
       "Adopt a pooled model with tenant isolation via Row Level Security (RLS), migrate to Aurora PostgreSQL with global database, implement read replicas per region, and use Amazon OpenSearch for complex queries",
       "Transition to a hybrid model with large tenants on dedicated Aurora instances and small tenants on shared clusters, implement AWS Database Migration Service for tenant movement, and use Amazon MemoryDB for caching"
   ],
   correct: 3,
   explanation: {
       correct: "Hybrid model addresses the noisy neighbor problem by isolating large tenants, dedicated instances eliminate cross-tenant performance impact, DMS enables seamless tenant migration between tiers, and MemoryDB provides Redis-compatible caching with durability. This approach balances cost and performance while enabling granular scaling.",
       whyWrong: {
           0: "Single database with 15,000 schemas will still face fundamental PostgreSQL limitations even with Aurora, and schema migration issues persist",
           1: "Database-per-tenant with 15,000 databases becomes extremely expensive and complex to manage, even with Serverless v2",
           2: "RLS with 15,000 tenants in a pooled model creates significant performance overhead and doesn't solve schema migration challenges"
       },
       examStrategy: "For multi-tenant architecture problems at scale, hybrid models (combining pooled and dedicated) often provide the best balance. Consider tenant segmentation based on size/requirements rather than one-size-fits-all approaches."
   }
},
{
   id: 'sap_052',
   domain: "Domain 4: Accelerate Workload Migration and Modernization",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A broadcasting company needs to migrate 5PB of video archives from LTO tape libraries to AWS. The tapes are stored in an offline vault requiring 24-hour retrieval notice. The migration must maintain the existing Media Asset Management (MAM) system's file paths, support partial file restore for editing workflows, complete within 12 months, and reduce retrieval time from 24 hours to under 1 hour for any asset.",
   question: "Which migration and storage strategy BEST meets these requirements?",
   options: [
       "AWS Snowball Edge for bulk transfer, store in S3 Glacier Flexible Retrieval with S3 Inventory, implement AWS DataSync for ongoing updates, and use S3 Batch Operations for bulk restores",
       "AWS Direct Connect with Storage Gateway Tape Gateway for virtual tape library, migrate to S3 Glacier Instant Retrieval, maintain file interface with Storage Gateway File Gateway, and implement S3 Intelligent-Tiering",
       "Multiple AWS Snowmobile for massive transfer, store in S3 Glacier Deep Archive with metadata in DynamoDB, implement Lambda-based retrieval workflow, and use AWS Backup for management",
       "AWS Snowball Edge devices in parallel, store in S3 Standard with immediate transition to Glacier Instant Retrieval, implement Amazon FSx for Windows File Server for MAM compatibility, and use S3 Object Lambda for path translation"
   ],
   correct: 3,
   explanation: {
       correct: "Parallel Snowball Edge devices accelerate transfer within 12 months, Glacier Instant Retrieval provides <1 hour access at lower cost, FSx for Windows maintains file system semantics required by MAM systems, and S3 Object Lambda transparently handles path translation without MAM changes.",
       whyWrong: {
           0: "Glacier Flexible Retrieval has 1-12 hour retrieval time not meeting <1 hour requirement, and doesn't maintain file system interface for MAM",
           1: "Tape Gateway is for ongoing tape workflows not bulk migration, and wouldn't complete 5PB transfer in 12 months over network",
           2: "Snowmobile is overkill for 5PB and has long logistics time, Deep Archive has 12+ hour retrieval time not meeting requirements"
       },
       examStrategy: "For large-scale tape migrations, consider parallel Snowball devices for speed. Glacier Instant Retrieval is key for <1 hour access at archive prices. FSx provides file system compatibility for legacy applications."
   }
},
{
   id: 'sap_053',
   domain: "Domain 1: Design Solutions for Organizational Complexity",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A global investment firm has 500 AWS accounts across trading desks, research teams, and support functions. Regulations require complete audit trails, 7-year data retention, real-time anomaly detection for insider trading, and geographic restrictions on certain trading data. The firm needs to implement a data lake for compliance reporting while allowing teams to maintain independent development velocity.",
   question: "Which solution provides comprehensive compliance while preserving team autonomy?",
   options: [
       "AWS Control Tower with custom guardrails, AWS CloudTrail Lake for centralized audit, Amazon Security Lake for threat detection, AWS Organizations SCPs for geographic restrictions, and Amazon DataZone for federated data governance",
       "AWS Landing Zone with account vending, centralized logging to S3, Amazon GuardDuty with custom threat intelligence, AWS Config conformance packs, and AWS Lake Formation with cross-account permissions",
       "AWS Organizations with consolidated billing, Amazon Macie for data discovery, AWS CloudWatch cross-account observability, IAM permission boundaries, and Amazon Athena federated query",
       "AWS SSO with permission sets, AWS CloudTrail organization trail, Amazon Detective for investigation, VPC endpoint policies for data residency, and AWS Glue Data Catalog with Lake Formation"
   ],
   correct: 0,
   explanation: {
       correct: "Control Tower provides governed account provisioning with custom guardrails for regulations, CloudTrail Lake offers managed 7-year retention with SQL querying, Security Lake centralizes security findings with anomaly detection, SCPs enforce geographic restrictions at the organizational level, and DataZone enables federated governance preserving team autonomy.",
       whyWrong: {
           1: "Landing Zone is deprecated in favor of Control Tower, and custom S3 logging requires more management for 7-year compliance retention",
           2: "Lacks centralized security data lake capabilities for insider trading detection, and CloudWatch isn't designed for long-term audit retention",
           3: "Missing automated account governance and Security Lake's purpose-built compliance features for financial services requirements"
       },
       examStrategy: "For enterprise compliance with team autonomy, Control Tower + Security Lake + DataZone is the modern pattern. CloudTrail Lake provides managed long-term audit storage. Remember Landing Zone is deprecated."
   }
},
{
   id: 'sap_054',
   domain: "Domain 2: Design for New Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A smart city initiative needs to process data from 1 million IoT sensors including traffic cameras, air quality monitors, and utility meters. The platform must handle 10 million messages per second, provide real-time alerts for emergencies (<1 second), support 5-year historical analysis, enable citizen mobile app with 50ms response time, and integrate with 20 different city department systems using various protocols.",
   question: "Which architecture BEST handles this scale and diversity of requirements?",
   options: [
       "AWS IoT Core with Basic Ingest for cost optimization, Amazon Kinesis Data Streams for real-time processing, Amazon Timestream for time-series storage, AWS AppSync for mobile API, and Amazon EventBridge for system integration",
       "AWS IoT SiteWise for sensor management, Amazon MSK for streaming, Amazon S3 with Athena for historical data, Amazon API Gateway with Lambda for mobile backend, and AWS Step Functions for orchestration",
       "AWS IoT Core Fleet Provisioning for device management, Amazon Kinesis Data Analytics for stream processing, Amazon OpenSearch for real-time analytics, Amazon CloudFront with Lambda@Edge for mobile, and Amazon MQ for legacy integration",
       "AWS IoT Device Management for fleet operations, Amazon Managed Service for Apache Flink for complex event processing, hybrid storage with Timestream (hot) and S3 (cold), Amazon Neptune for relationship analysis, and AWS Transfer Family for file-based integration"
   ],
   correct: 0,
   explanation: {
       correct: "IoT Core with Basic Ingest reduces costs by bypassing message broker for high-volume telemetry, Kinesis handles 10M messages/second with multiple shards, Timestream is purpose-built for IoT time-series with automatic tiering, AppSync provides real-time subscriptions with 50ms response via caching, and EventBridge offers native integration with 20+ protocols.",
       whyWrong: {
           1: "IoT SiteWise is for industrial IoT not smart city scale, and API Gateway + Lambda adds latency vs AppSync's managed GraphQL subscriptions",
           2: "Lambda@Edge isn't suitable for complex mobile backend logic, and MQ doesn't scale to 10M messages/second",
           3: "Neptune adds unnecessary complexity for time-series data, and Transfer Family is for file protocols not real-time streaming"
       },
       examStrategy: "For massive IoT scale, IoT Core Basic Ingest is crucial for cost. Timestream is the go-to for IoT time-series data. AppSync excels at real-time mobile/web APIs with subscriptions."
   }
},
{
   id: 'sap_055',
   domain: "Domain 3: Continuous Improvement for Existing Solutions",
   difficulty: "medium",
   timeRecommendation: 150,
   scenario: "An online education platform experiences severe performance degradation during exam periods. The current architecture uses Application Load Balancer → 30 EC2 instances → RDS MySQL read replicas (1 writer, 5 readers). During exams, database CPU hits 100%, read replica lag exceeds 30 seconds, and students experience timeout errors. The platform serves 500,000 concurrent students during peak exam times with 50,000 exam submissions per minute.",
   question: "Which optimization strategy would MOST effectively resolve the performance issues?",
   options: [
       "Implement Amazon ElastiCache for Redis with write-through caching for exam questions and student responses, add RDS Proxy for connection pooling, implement Aurora Auto Scaling for read replicas, and use SQS for asynchronous exam submission processing",
       "Migrate to Aurora Serverless v2 for automatic scaling, implement DynamoDB for exam session state, add CloudFront for static content, and use Step Functions for exam workflow orchestration",
       "Scale to 60 EC2 instances, add more RDS read replicas, implement database sharding by exam ID, and use Application Load Balancer request routing based on exam type",
       "Containerize on EKS with Horizontal Pod Autoscaler, implement Amazon MemoryDB for session management, migrate to Aurora PostgreSQL for better concurrency, and add API Gateway with throttling"
   ],
   correct: 0,
   explanation: {
       correct: "ElastiCache write-through caching dramatically reduces database load for frequently accessed exam questions, RDS Proxy prevents connection exhaustion during peaks, Aurora Auto Scaling dynamically adjusts read capacity, and SQS decouples submission processing preventing timeout errors during peak submission periods.",
       whyWrong: {
           1: "Serverless v2 might struggle with consistent high load during exams, and mixing DynamoDB for state adds complexity without addressing core database bottleneck",
           2: "Simply adding more resources doesn't solve the fundamental architecture issues, and manual sharding is complex to implement and maintain",
           3: "Containerization doesn't address the database bottleneck, and PostgreSQL migration requires significant application changes"
       },
       examStrategy: "For read-heavy workloads with predictable content (exam questions), caching is crucial. RDS Proxy solves connection pool exhaustion. Asynchronous processing (SQS) prevents cascade failures during peaks."
   }
},
{
   id: 'sap_056',
   domain: "Domain 4: Accelerate Workload Migration and Modernization",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A pharmaceutical company must migrate a validated GxP system from on-premises VMware to AWS. The system includes 200 VMs, Oracle RAC databases, NFS storage for research data, and integrations with lab equipment. FDA regulations require validation documentation, 21 CFR Part 11 compliance for electronic signatures, no data modification during migration, and ability to demonstrate the migrated system is identical to source.",
   question: "Which migration approach ensures regulatory compliance and system validation?",
   options: [
       "AWS Application Migration Service (MGN) for block-level replication, Amazon FSx for NetApp ONTAP for NFS compatibility, Amazon RDS Custom for Oracle RAC support, AWS Artifact for compliance documentation, and parallel validation environment",
       "VMware Cloud on AWS for lift-and-shift, AWS DataSync for NFS migration, native Oracle RAC on EC2, AWS Config for compliance monitoring, and automated testing with AWS Device Farm",
       "AWS Server Migration Service for VM replication, Amazon EFS for shared storage, Oracle RAC alternatives on Aurora, AWS Audit Manager for compliance, and manual validation procedures",
       "CloudEndure Migration for continuous replication, Amazon FSx for OpenZFS, containerized Oracle on EKS, AWS CloudTrail for audit logs, and infrastructure as code validation"
   ],
   correct: 0,
   explanation: {
       correct: "MGN provides block-level replication ensuring exact copies for validation, FSx for NetApp ONTAP maintains NFS semantics and features critical for no-modification requirement, RDS Custom supports Oracle RAC in managed environment, Artifact provides GxP compliance documentation, and parallel validation enables FDA-required testing without disrupting production.",
       whyWrong: {
           1: "VMware Cloud on AWS is expensive and doesn't provide the compliance artifacts needed for GxP validation",
           2: "SMS is deprecated in favor of MGN, and Aurora doesn't support Oracle RAC features required for validated systems",
           3: "Containerizing Oracle RAC breaks validation as it's not identical to source system, violating FDA requirements"
       },
       examStrategy: "For GxP/regulated migrations, maintaining identical functionality is crucial. MGN is the modern replacement for SMS. RDS Custom enables managed databases with OS access required for Oracle RAC."
   }
},
{
   id: 'sap_057',
   domain: "Domain 1: Design Solutions for Organizational Complexity",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A multi-national retail corporation has acquired 5 companies in the last year, each with their own AWS accounts, technology stacks, and DevOps practices. The CTO mandates unified CI/CD pipelines, centralized security scanning, consistent tagging for cost allocation, and shared services (authentication, monitoring, logging) while allowing acquired companies to maintain their deployment autonomy for 18 months during integration.",
   question: "Which approach BEST balances standardization with autonomy during the integration period?",
   options: [
       "AWS Control Tower for account governance, AWS Service Catalog for approved services, AWS CodePipeline with shared templates, Amazon ECR with image scanning, AWS Organizations tag policies, and AWS SSO for centralized authentication",
       "AWS Organizations for account structure, AWS CodeCommit with branch protections, Jenkins on ECS for CI/CD, Amazon Inspector for security, manual tagging enforcement, and Active Directory federation",
       "AWS Landing Zone for multi-account, GitLab CI/CD with runners in each account, AWS Security Hub for scanning, Cost and Usage Reports for allocation, and Okta for identity management",
       "GitHub Actions with self-hosted runners, AWS CloudFormation StackSets for governance, Amazon GuardDuty for security, AWS Resource Groups for tagging, and AWS Cognito for authentication"
   ],
   correct: 0,
   explanation: {
       correct: "Control Tower provides governed account structure with guardrails allowing autonomy within boundaries, Service Catalog enables self-service while maintaining compliance, CodePipeline templates standardize CI/CD while allowing customization, ECR scanning centralizes security, tag policies enforce standards automatically, and SSO provides unified authentication without disrupting existing workflows.",
       whyWrong: {
           1: "CodeCommit forces repository migration disrupting existing workflows, and manual tagging won't ensure compliance across acquired companies",
           2: "Landing Zone is deprecated, and GitLab requires additional infrastructure management vs native AWS services",
           3: "GitHub Actions with self-hosted runners adds complexity, and StackSets alone doesn't provide the governance framework needed"
       },
       examStrategy: "For M&A scenarios, Control Tower + Service Catalog enables governed self-service. Tag policies ensure compliance without manual intervention. Native AWS services reduce integration complexity during transitions."
   }
},
{
   id: 'sap_058',
   domain: "Domain 2: Design for New Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A social media platform is building a content moderation system that must process 100 million posts daily containing text, images, and videos. The system needs to detect harmful content in <2 seconds, support 50 languages, adapt to emerging threat patterns, maintain 99.99% accuracy for CSAM detection, provide explainable decisions for appeals, and comply with different regional content policies.",
   question: "Which architecture provides the MOST comprehensive and scalable content moderation solution?",
   options: [
       "Amazon Rekognition Content Moderation for images/video, Amazon Comprehend for text analysis with custom classifiers, Amazon Augmented AI (A2I) for human review workflows, Amazon SageMaker for custom models, DynamoDB for decision storage, and Lambda@Edge for regional policy enforcement",
       "Amazon Textract for text extraction, Amazon Translate for multi-language support, Amazon Personalize for threat pattern learning, Amazon Fraud Detector for risk scoring, S3 Intelligent-Tiering for content storage, and Step Functions for orchestration",
       "Amazon Transcribe for video-to-text, Amazon Lex for intent detection, Amazon Forecast for threat prediction, Amazon Neptune for relationship analysis, ElastiCache for real-time scoring, and API Gateway for content submission",
       "Amazon Polly for audio analysis, Amazon Kendra for content indexing, Amazon CodeGuru for pattern detection, Amazon QuickSight for moderation dashboards, Kinesis Data Streams for ingestion, and CloudFront for content delivery"
   ],
   correct: 0,
   explanation: {
       correct: "Rekognition Content Moderation is purpose-built for harmful content detection in images/video, Comprehend with custom classifiers handles multi-language text analysis and can be trained on emerging threats, A2I enables human-in-the-loop for high-stakes decisions and appeals, SageMaker allows custom models for CSAM with required accuracy, DynamoDB provides fast decision storage and retrieval, and Lambda@Edge enables regional policy variations at the edge.",
       whyWrong: {
           1: "Textract is for document text extraction not content moderation, Personalize is for recommendations not threat detection, and Fraud Detector isn't designed for content moderation",
           2: "Transcribe is for speech-to-text not content analysis, Lex is for chatbots not content moderation, and Forecast is for time-series not threat detection",
           3: "Polly is for text-to-speech not analysis, CodeGuru is for code review not content patterns, and this lacks core content moderation capabilities"
       },
       examStrategy: "For content moderation, Rekognition Content Moderation + Comprehend is the core combination. A2I is crucial for human review requirements. SageMaker enables custom models for specific compliance needs."
   }
},
{
   id: 'sap_059',
   domain: "Domain 3: Continuous Improvement for Existing Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A logistics company's route optimization system processes 50,000 delivery routes daily using a monolithic .NET application on Windows EC2 instances. The system takes 6 hours for daily batch processing, costs $200,000/month, cannot handle real-time route updates, and fails to scale during peak seasons. The company wants to enable real-time optimization while reducing processing time to under 1 hour.",
   question: "Which modernization approach BEST achieves real-time capabilities and performance targets?",
   options: [
       "Decompose into microservices on AWS Lambda with .NET 6 runtime, use Step Functions Express Workflows for orchestration, implement Amazon Location Service for routing, DynamoDB for route storage with DAX caching, and EventBridge for real-time triggers",
       "Containerize on ECS with AWS Fargate for Windows, implement Amazon SQS for job queuing, use Amazon ElastiCache for optimization caching, Aurora PostgreSQL for data, and Application Load Balancer for traffic distribution",
       "Migrate to AWS Batch with Spot Fleet for batch processing, implement Kinesis Data Streams for real-time updates, use Amazon SageMaker for route optimization ML, Redshift for analytics, and API Gateway for real-time endpoints",
       "Refactor to .NET Core on Linux with EKS and Karpenter, implement Apache Kafka on MSK for event streaming, use Amazon Neptune for route graph analysis, OpenSearch for real-time queries, and CloudFront for API caching"
   ],
   correct: 0,
   explanation: {
       correct: "Lambda with .NET 6 enables massive parallelization reducing 6 hours to <1 hour, Step Functions Express Workflows orchestrate high-volume, short-duration route calculations efficiently, Location Service provides managed routing without custom algorithms, DynamoDB with DAX delivers microsecond latency for real-time updates, and EventBridge enables event-driven real-time optimization triggers.",
       whyWrong: {
           1: "Fargate for Windows has higher costs and startup latency, and doesn't provide the parallelization needed to meet 1-hour target",
           2: "Batch is for scheduled jobs not real-time processing, and mixing batch with streaming adds unnecessary complexity",
           3: "Full Kubernetes adds operational overhead, and Neptune is overkill for route optimization vs purpose-built Location Service"
       },
       examStrategy: "For batch-to-real-time modernization, serverless (Lambda) provides best parallelization. Location Service is purpose-built for routing. Step Functions Express Workflows are designed for high-volume, short-duration workflows."
   }
},
{
   id: 'sap_060',
   domain: "Domain 4: Accelerate Workload Migration and Modernization",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A national hospital network needs to migrate 200 applications from 5 data centers to AWS. Applications include Epic EHR, PACS imaging systems storing 2PB of DICOM files, legacy MUMPS databases, Windows-based clinical apps, and Linux research workloads. Migration must maintain HIPAA compliance, support hybrid operation for 2 years, complete critical systems within 6 months, and achieve 30% cost reduction.",
   question: "Which migration strategy and tooling combination BEST meets these complex requirements?",
   options: [
       "AWS Migration Hub for orchestration, Application Migration Service for servers, DataSync for PACS data, AWS HealthLake for DICOM storage, Database Migration Service for MUMPS to DocumentDB, AWS Outposts for hybrid connectivity, and Reserved Instances for cost optimization",
       "Migration Evaluator for assessment, AWS Application Discovery Service for dependency mapping, Snowball Edge for PACS transfer, S3 with Gateway Endpoints for DICOM, mainframe modernization for MUMPS, Direct Connect for hybrid, and Savings Plans for cost reduction",
       "AWS MAP (Migration Acceleration Program) for funding and expertise, MGN for critical systems, AWS Storage Gateway for PACS caching, FSx for Windows for clinical apps, MUMPS containers on EKS, Transit Gateway for hybrid network, and Spot Instances where applicable",
       "CloudEndure for continuous replication, AWS Backup for data protection, Snowmobile for bulk transfer, Glacier for DICOM archival, RDS Custom for MUMPS migration, VPN for connectivity, and Cost Explorer for optimization"
   ],
   correct: 0,
   explanation: {
       correct: "Migration Hub provides centralized tracking across 200 applications, MGN enables rapid migration of critical systems within 6 months, DataSync handles continuous PACS synchronization, HealthLake is HIPAA-compliant and purpose-built for medical imaging with DICOM support, DMS can migrate MUMPS to DocumentDB maintaining hierarchical structure, Outposts enables true hybrid infrastructure for 2-year transition, and RIs provide predictable 30% cost savings.",
       whyWrong: {
           1: "Lacks specific healthcare capabilities of HealthLake, and mainframe modernization for MUMPS is unnecessarily complex for hospital systems",
           2: "MAP is a program not a tool, FSx for Windows doesn't handle DICOM natively, and containerizing MUMPS adds risk for critical healthcare systems",
           3: "CloudEndure is superseded by MGN, Glacier doesn't support DICOM querying needed for PACS, and RDS Custom doesn't support MUMPS"
       },
       examStrategy: "For healthcare migrations, HealthLake is purpose-built for medical imaging. MGN (successor to CloudEndure) is the modern server migration service. Outposts provides true hybrid infrastructure for extended transitions."
   }
};

// Continuing questions 61-70...
{
   id: 'sap_061',
   domain: "Domain 1: Design Solutions for Organizational Complexity",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A global manufacturing conglomerate operates 100 factories across 40 countries, each with its own AWS account for factory automation and IoT data. Corporate requires unified predictive maintenance analytics, real-time production monitoring, centralized quality control ML models, and supply chain visibility. Each factory must maintain operational independence due to regulations and network reliability concerns. The solution must handle 50TB daily data ingestion and support offline operation for 72 hours.",
   question: "Which architecture BEST balances central analytics with factory autonomy and offline resilience?",
   options: [
       "AWS IoT SiteWise Edge for local data collection with buffering, AWS IoT Greengrass for edge ML inference, AWS DataSync for resilient data transfer to central data lake, Amazon SageMaker multi-model endpoints for centralized training with edge deployment, and AWS IoT TwinMaker for unified digital twins",
       "AWS Outposts in each factory for local processing, Amazon MSK for event streaming, AWS Direct Connect with backup VPN, centralized Amazon Redshift for analytics, and AWS Lambda for real-time processing",
       "AWS Snow Family for edge computing, Amazon Kinesis Data Firehose for ingestion, S3 Cross-Region Replication for data distribution, Amazon EMR for big data processing, and QuickSight for dashboards",
       "AWS Local Zones for factory proximity, Amazon RDS with read replicas, AWS Batch for processing, centralized Elasticsearch for analytics, and AWS AppSync for offline synchronization"
   ],
   correct: 0,
   explanation: {
       correct: "IoT SiteWise Edge provides industrial data collection with 72-hour buffering for offline resilience, Greengrass enables edge ML inference maintaining operations during disconnection, DataSync handles intermittent connectivity gracefully, SageMaker multi-model endpoints allow centralized training with optimized edge deployment, and IoT TwinMaker provides unified visibility across all factories while respecting autonomy.",
       whyWrong: {
           1: "Outposts requires reliable connectivity and is expensive for 100 factories, MSK doesn't handle offline scenarios well",
           2: "Snow Family is for migration not permanent edge computing, and Kinesis Firehose requires consistent connectivity",
           3: "Local Zones aren't available in all 40 countries, and RDS replicas don't support offline operation for 72 hours"
       },
       examStrategy: "For industrial IoT with offline requirements, IoT SiteWise Edge + Greengrass is the standard pattern. IoT TwinMaker provides digital twin capabilities for manufacturing. DataSync handles unreliable networks better than streaming services."
   }
},
{
   id: 'sap_062',
   domain: "Domain 2: Design for New Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A cryptocurrency exchange is building a new trading platform requiring: processing 1 million transactions per second with <10ms latency, maintaining full ACID compliance for financial transactions, supporting complex queries for regulatory reporting, storing all transaction history immutably for 10 years, providing real-time fraud detection, and ensuring 99.999% availability with zero data loss.",
   question: "Which architecture BEST meets these extreme performance and compliance requirements?",
   options: [
       "Amazon MemoryDB for ultra-low latency with persistence, Amazon QLDB for immutable transaction ledger, Amazon Kinesis Data Analytics for real-time fraud detection, Amazon S3 with Object Lock for long-term storage, and Amazon DocumentDB for complex queries",
       "Amazon DynamoDB with Global Tables for performance, Amazon Timestream for time-series transactions, AWS Lambda for fraud detection, Amazon Macie for compliance monitoring, and Amazon Neptune for transaction relationships",
       "Amazon ElastiCache for Redis with cluster mode, Amazon Aurora with write forwarding, Amazon Fraud Detector for risk scoring, AWS Backup with vault lock, and Amazon Athena for regulatory queries",
       "Amazon Keyspaces for Cassandra compatibility, Amazon EventBridge for event processing, Amazon SageMaker for fraud models, Amazon Glacier for archival, and Amazon Redshift for reporting"
   ],
   correct: 0,
   explanation: {
       correct: "MemoryDB provides Redis-compatible performance with <10ms latency plus Multi-AZ persistence ensuring zero data loss, QLDB offers immutable ledger with cryptographic verification required for financial compliance, Kinesis Analytics enables real-time fraud detection on streaming transactions, S3 Object Lock ensures immutable 10-year retention, and DocumentDB handles complex regulatory queries with MongoDB compatibility.",
       whyWrong: {
           1: "DynamoDB lacks ACID transactions for complex financial operations, and Timestream isn't designed for transactional workloads requiring immediate consistency",
           2: "ElastiCache for Redis lacks the durability guarantees of MemoryDB, and Aurora can't achieve 1M TPS with <10ms latency",
           3: "Keyspaces is eventually consistent not suitable for financial transactions, and Glacier retrieval time conflicts with reporting requirements"
       },
       examStrategy: "For ultra-high performance with durability, MemoryDB > ElastiCache. QLDB is purpose-built for immutable financial ledgers. Always verify ACID compliance for financial workloads."
   }
},
{
   id: 'sap_063',
   domain: "Domain 3: Continuous Improvement for Existing Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A video game company's multiplayer platform supports 10 million daily active users. Current architecture uses Network Load Balancer → 100 c5.4xlarge EC2 instances → Amazon DynamoDB. Problems include: $300,000 monthly costs, 15% of instances idle during off-peak, connection drops during auto-scaling events, DynamoDB hot partition keys during viral events, and 5-second matchmaking latency. The platform needs to reduce costs by 40% while improving matchmaking to <1 second.",
   question: "Which optimization strategy BEST achieves both cost reduction and performance improvement?",
   options: [
       "Implement AWS GameLift FleetIQ for intelligent Spot instance management, Amazon ElastiCache for matchmaking cache, DynamoDB Contributor Insights to identify and fix hot keys, Application Load Balancer with connection draining, and Compute Savings Plans for remaining On-Demand instances",
       "Migrate to Amazon EKS with Cluster Autoscaler, implement Redis on Amazon MemoryDB for session state, partition DynamoDB tables by region, use AWS Global Accelerator for anycast, and Reserved Instances for baseline capacity",
       "Containerize on ECS with capacity providers mixing Spot and On-Demand, implement Amazon GameLift FlexMatch for matchmaking, use DynamoDB Global Tables with auto-scaling, implement AWS App Mesh for service mesh, and Spot Fleet for batch workloads",
       "Transition to Lambda for connection handling, Amazon Gamelift Realtime Servers for game sessions, Amazon Neptune for player graphs, DynamoDB Accelerator for caching, and CloudFront for static assets"
   ],
   correct: 0,
   explanation: {
       correct: "GameLift FleetIQ optimizes Spot instances specifically for gaming workloads achieving 40%+ savings, ElastiCache dramatically reduces matchmaking queries to DynamoDB improving speed to <1 second, Contributor Insights identifies hot keys for targeted fixes, ALB with connection draining prevents drops during scaling, and Savings Plans provide additional 20% savings on remaining On-Demand usage.",
       whyWrong: {
           1: "Generic EKS doesn't provide gaming-specific optimizations of GameLift, and regional partitioning doesn't solve hot key issues",
           2: "FlexMatch without FleetIQ misses Spot optimization opportunity, and Global Tables add cost without solving the hot partition problem",
           3: "Lambda isn't suitable for stateful game connections, and Neptune is overkill for matchmaking compared to purpose-built ElastiCache"
       },
       examStrategy: "For gaming workloads, GameLift services provide purpose-built optimizations. Contributor Insights is key for diagnosing DynamoDB hot partitions. Combine multiple cost optimization strategies (Spot + Savings Plans)."
   }
},
{
   id: 'sap_064',
   domain: "Domain 4: Accelerate Workload Migration and Modernization",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A European bank must migrate from IBM mainframe z/OS to AWS within 18 months due to data center closure. The system includes: 50,000 COBOL programs, 100TB of DB2 data with referential integrity, CICS transactions processing 2 million daily operations, JCL batch jobs with complex dependencies, VSAM files, and MQ Series integrations. EU banking regulations require parallel run validation and zero data loss.",
   question: "Which migration approach ensures regulatory compliance and timeline achievement?",
   options: [
       "AWS Mainframe Modernization Service with Blu Age for automated refactoring to Java, Amazon Aurora PostgreSQL for DB2 migration, Amazon MQ for MQ Series compatibility, AWS Batch for JCL replacement, Step Functions for job orchestration, and 6-month parallel run with data reconciliation",
       "AWS Mainframe Modernization Service with Micro Focus for rehosting, RDS for Db2 to maintain compatibility, AWS Transfer Family for file transfer, Amazon Managed Workflows for Apache Airflow for batch, EventBridge for CICS events, and incremental cutover with rollback capability",
       "Manual COBOL to Java conversion with contractors, DynamoDB for modernized data model, Lambda for CICS replacement, ECS for batch processing, Amazon MSK for messaging, and big-bang cutover with extensive testing",
       "Containerize COBOL with OpenCOBOL on EKS, migrate DB2 to Amazon RDS Custom, implement Kafka for event streaming, AWS Glue for ETL, API Gateway for service exposure, and phased migration by business function"
   ],
   correct: 0,
   explanation: {
       correct: "Blu Age automated refactoring reduces risk and time vs manual conversion, Aurora PostgreSQL provides DB2 compatibility with better AWS integration, Amazon MQ maintains MQ Series protocols for seamless integration, AWS Batch naturally replaces JCL batch processing, Step Functions handles complex job dependencies, and 6-month parallel run satisfies regulatory validation requirements.",
       whyWrong: {
           1: "Rehosting with Micro Focus doesn't modernize for cloud benefits, and MWAA isn't designed for mainframe batch job complexity",
           2: "Manual conversion of 50,000 programs in 18 months is unrealistic, and big-bang cutover violates regulatory parallel run requirements",
           3: "OpenCOBOL containerization lacks enterprise support needed for banking, and phased migration is complex with tightly coupled mainframe systems"
       },
       examStrategy: "For mainframe modernization under time pressure, automated refactoring (Blu Age) > manual conversion. AWS Mainframe Modernization Service is purpose-built. Parallel run is mandatory for regulated industries."
   }
},
{
   id: 'sap_065',
   domain: "Domain 1: Design Solutions for Organizational Complexity",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A global pharmaceutical company has 300 AWS accounts across R&D, manufacturing, and commercial divisions. New regulations require: segregation of duties with approval workflows, encryption of all data with customer-managed keys, 90-day maximum access for external researchers, quarterly access reviews with evidence, immutable audit logs for 7 years, and automated remediation of non-compliant resources within 1 hour.",
   question: "Which solution MOST comprehensively addresses these regulatory requirements?",
   options: [
       "AWS Control Tower with custom controls, AWS IAM Identity Center with temporary elevated access management, AWS CloudTrail Lake for immutable audit storage, AWS Config with auto-remediation rules, AWS KMS with key policies enforcing encryption, and AWS Audit Manager for compliance evidence collection",
       "AWS Organizations with SCPs, AWS SSO with session policies, S3 Object Lock for audit logs, AWS Systems Manager for remediation, CloudHSM for key management, and AWS Security Hub for compliance monitoring",
       "AWS Landing Zone with guardrails, IAM roles with external ID, CloudWatch Logs with encryption, AWS Lambda for auto-remediation, AWS Secrets Manager for key rotation, and Amazon Macie for data discovery",
       "Federated access with SAML, IAM permission boundaries, Amazon QLDB for audit trail, AWS Config conformance packs, customer-managed CMKs, and Amazon Detective for investigation"
   ],
   correct: 0,
   explanation: {
       correct: "Control Tower enforces preventive controls for segregation of duties, IAM Identity Center's temporary elevated access management provides approval workflows with automatic expiration for 90-day requirement, CloudTrail Lake offers 7-year immutable storage with SQL querying, Config auto-remediation ensures 1-hour compliance, KMS key policies enforce encryption at scale, and Audit Manager automates evidence collection for quarterly reviews.",
       whyWrong: {
           1: "SSO lacks temporary elevated access workflows, S3 Object Lock requires manual configuration per bucket, and CloudHSM is overkill for this use case",
           2: "Landing Zone is deprecated, CloudWatch Logs isn't designed for 7-year immutable audit storage, and lacks automated compliance evidence collection",
           3: "Missing centralized governance framework, QLDB is for application data not audit logs, and lacks automated access review capabilities"
       },
       examStrategy: "For comprehensive compliance: Control Tower + IAM Identity Center (formerly SSO) + Audit Manager is the modern pattern. CloudTrail Lake provides managed long-term audit storage. Temporary elevated access is key for external users."
   }
},
{
   id: 'sap_066',
   domain: "Domain 2: Design for New Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A metaverse platform needs to support 1 million concurrent users in shared virtual spaces. Requirements include: <50ms latency for user interactions globally, real-time 3D asset streaming (100GB+ per space), spatial audio processing for proximity chat, physics simulation at 60 FPS, blockchain integration for NFT ownership, AI-driven NPCs with natural language, and 8K resolution support for VR headsets.",
   question: "Which architecture BEST delivers this immersive metaverse experience at scale?",
   options: [
       "Amazon CloudFront with multiple origins for asset delivery, AWS Wavelength for ultra-low latency compute, Amazon GameLift Realtime Servers for world hosting, Amazon IVS for audio/video streaming, Amazon Managed Blockchain for NFTs, Amazon Polly and Lex for NPC interactions, and AWS Local Zones for regional presence",
       "AWS Global Accelerator for anycast routing, Amazon EC2 G5 instances for GPU rendering, Amazon FSx for Lustre for asset storage, Amazon Chime SDK for spatial audio, Amazon Managed Blockchain for NFTs, Amazon Bedrock for AI NPCs, and CloudFront for content delivery",
       "Amazon Lightsail for simple deployment, Amazon S3 for asset storage, AWS AppSync for real-time synchronization, Amazon Kinesis Video Streams for streaming, Amazon QLDB for NFT ledger, Amazon Comprehend for chat moderation, and Route 53 for geo-routing",
       "AWS Outposts for on-premise deployment, Amazon ECS with GPU support, Amazon EFS for shared storage, Amazon Connect for voice chat, DynamoDB for NFT tracking, Amazon Rekognition for avatar creation, and Direct Connect for dedicated bandwidth"
   ],
   correct: 0,
   explanation: {
       correct: "CloudFront with multiple origins efficiently delivers massive 3D assets globally, Wavelength provides edge computing with <50ms latency for mobile/5G users, GameLift Realtime Servers are purpose-built for multiplayer synchronization at 60 FPS, IVS handles scalable audio/video streaming for proximity chat, Managed Blockchain provides true NFT ownership, Polly and Lex enable natural NPC interactions, and Local Zones extend presence to metro areas.",
       whyWrong: {
           1: "G5 instances for 1M users would be extremely expensive, and Chime SDK isn't designed for spatial audio in 3D environments",
           2: "Lightsail lacks the scale for 1M users, and Kinesis Video isn't suitable for 3D asset streaming or interactive content",
           3: "Outposts doesn't provide global distribution, and Connect is for call centers not spatial audio in virtual worlds"
       },
       examStrategy: "For metaverse/gaming at scale: GameLift for multiplayer, Wavelength for mobile edge computing, IVS for streaming. Managed Blockchain (not QLDB) for true blockchain/NFT requirements."
   }
},
{
   id: 'sap_067',
   domain: "Domain 3: Continuous Improvement for Existing Solutions",
   difficulty: "medium",
   timeRecommendation: 150,
   scenario: "A news website runs on AWS with CloudFront → ALB → 20 m5.large EC2 instances → RDS MySQL. During breaking news, traffic increases 50x causing: CloudFront cache misses due to dynamic content, ALB target group unhealthy hosts, RDS connection exhaustion, and $50,000 unexpected data transfer costs. The site needs to handle viral traffic while controlling costs.",
   question: "Which optimization strategy MOST effectively handles viral traffic while minimizing costs?",
   options: [
       "Implement CloudFront origin request policies to increase cache hit ratio, configure ALB with slow start and connection draining, add RDS Proxy for connection pooling, enable Auto Scaling with predictive scaling, and use CloudFront Origin Shield to reduce origin requests",
       "Add more EC2 instances preemptively, upgrade to RDS instance with more connections, implement CloudWatch alarms for scaling, increase CloudFront TTLs, and purchase data transfer credits",
       "Migrate to Lambda@Edge for dynamic content, implement API Gateway caching, use DynamoDB for session state, add ElastiCache for database caching, and enable CloudFront compression",
       "Switch to Lightsail for predictable pricing, implement Varnish cache on EC2, use read replicas for RDS, add CloudFlare in front of CloudFront, and implement rate limiting"
   ],
   correct: 0,
   explanation: {
       correct: "Origin request policies optimize caching for dynamic content reducing backend load and transfer costs, slow start prevents overwhelming new instances during scaling, RDS Proxy eliminates connection exhaustion, predictive scaling anticipates viral traffic patterns, and Origin Shield acts as an additional caching layer reducing origin requests by up to 88% and associated data transfer costs.",
       whyWrong: {
           1: "Preemptively adding instances wastes money during normal traffic, and simply increasing TTLs doesn't work for dynamic news content",
           2: "Lambda@Edge adds complexity and cold starts during traffic spikes, and full migration during an incident is risky",
           3: "Lightsail has scaling limitations for viral traffic, and adding CloudFlare to CloudFront is redundant and adds latency"
       },
       examStrategy: "For viral traffic optimization: Origin Shield is key for reducing origin load. RDS Proxy solves connection pooling. Origin request policies optimize dynamic content caching without stale data."
   }
},
{
   id: 'sap_068',
   domain: "Domain 4: Accelerate Workload Migration and Modernization",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A government agency needs to migrate 1,000 applications from on-premises data centers to AWS GovCloud. Applications include classified systems (IL5), citizen-facing services requiring 24/7 availability, legacy Oracle forms applications, mainframe COBOL systems, and modern microservices. Migration must complete in 24 months, maintain FedRAMP High compliance, and achieve 25% cost reduction.",
   question: "Which migration strategy and approach ensures compliance while meeting aggressive timelines?",
   options: [
       "Portfolio assessment with Migration Evaluator, wave-based migration using AWS Application Migration Service for lift-and-shift, AWS Mainframe Modernization for COBOL systems, Oracle APEX on RDS for forms migration, AWS Control Tower for GovCloud account setup, and Reserved Instances for cost optimization",
       "AWS Professional Services engagement, containerization with EKS for microservices, rehost mainframes on EC2, Oracle Cloud@Customer for Oracle workloads, AWS Landing Zone for governance, and Spot Instances for development environments",
       "Partner-led migration with AWS MAP funding, CloudEndure for replication, serverless refactoring for citizen services, mainframe replacement with COTS solutions, Direct Connect to GovCloud, and Savings Plans for commitment discounts",
       "In-house migration team, manual application refactoring, AWS Outposts for classified systems, hybrid cloud with VMware on AWS, VPN connectivity, and on-demand pricing for flexibility"
   ],
   correct: 0,
   explanation: {
       correct: "Migration Evaluator provides data-driven portfolio analysis for 1,000 apps, wave-based approach enables systematic migration within 24 months, MGN allows rapid lift-and-shift for quick wins, Mainframe Modernization handles COBOL systems with compliance, Oracle APEX provides compatible forms migration path, Control Tower ensures FedRAMP compliance from day one, and RIs deliver 25% cost savings for government's predictable workloads.",
       whyWrong: {
           1: "Oracle Cloud@Customer isn't available in GovCloud, and rehosting mainframes on EC2 doesn't modernize or reduce costs",
           2: "CloudEndure is deprecated for MGN, COTS replacement for mainframe requires longer than 24 months, and partner-led may lack security clearances",
           3: "Outposts in GovCloud adds complexity, VMware on AWS is expensive, and on-demand pricing won't achieve 25% cost reduction"
       },
       examStrategy: "For government migrations: GovCloud requires specific services, Control Tower ensures compliance, wave-based migration manages complexity. MGN replaced CloudEndure. Consider security clearance requirements."
   }
},
{
   id: 'sap_069',
   domain: "Domain 1: Design Solutions for Organizational Complexity",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A financial services firm has 200 development teams across 50 AWS accounts. Each team deploys 20+ times daily to production. The firm needs to implement: security scanning for all deployments, prevention of cryptocurrency mining, secrets rotation every 30 days, cost allocation per feature/deployment, compliance with SOC2 and PCI-DSS, and deployment rollback within 2 minutes. Teams must maintain deployment velocity.",
   question: "Which solution provides comprehensive governance without impacting deployment speed?",
   options: [
       "AWS CodePipeline with native security stages, Amazon ECR image scanning with Security Hub integration, AWS Secrets Manager with automatic rotation, AWS Organizations cost allocation tags with automated enforcement, AWS Config conformance packs for compliance, and AWS CodeDeploy with automatic rollback on CloudWatch alarms",
       "GitLab CI/CD with security scanning, Amazon Inspector for vulnerability assessment, HashiCorp Vault for secrets, manual tagging policies, AWS Audit Manager for compliance, and blue-green deployments with Route 53",
       "Jenkins with security plugins, AWS Systems Manager Parameter Store, CloudFormation drift detection, Cost Explorer with custom reports, third-party compliance tools, and canary deployments with Lambda",
       "GitHub Actions with security workflows, Amazon GuardDuty for threat detection, AWS KMS for encryption, AWS Budgets for cost control, AWS Security Hub for compliance, and feature flags for rollback"
   ],
   correct: 0,
   explanation: {
       correct: "CodePipeline native security stages maintain velocity without external dependencies, ECR scanning with Security Hub provides centralized vulnerability management preventing crypto mining, Secrets Manager automatic rotation ensures 30-day compliance without manual intervention, Organizations tag enforcement ensures accurate cost allocation, Config conformance packs provide continuous SOC2/PCI compliance checking, and CodeDeploy automatic rollback achieves 2-minute recovery using CloudWatch metrics.",
       whyWrong: {
           1: "GitLab adds external dependency and complexity, manual tagging won't ensure compliance across 200 teams, and blue-green doubles infrastructure costs",
           2: "Jenkins requires significant maintenance overhead, Parameter Store lacks automatic rotation, and drift detection is reactive not preventive",
           3: "GitHub Actions lacks native AWS security integration, GuardDuty is detective not preventive for crypto mining, and feature flags require application changes"
       },
       examStrategy: "For high-velocity governance: native AWS services reduce complexity. Automatic enforcement > manual policies. ECR scanning prevents malicious images. CodeDeploy provides fastest rollback with CloudWatch integration."
   }
},
{
   id: 'sap_070',
   domain: "Domain 2: Design for New Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "An AI startup is building a real-time video analysis platform for 10,000 security cameras. The platform must: detect threats in <2 seconds, support 4K video streams, identify 500 different object types, track people across multiple cameras, store 30 days of video with instant replay, provide custom AI model training per customer, and maintain privacy compliance with automatic face blurring.",
   question: "Which architecture BEST balances real-time performance with scalability and privacy?",
   options: [
       "Amazon Kinesis Video Streams for ingestion, Amazon Rekognition Custom Labels for object detection, AWS Panorama for edge inference, Amazon SageMaker for model training, Amazon S3 Intelligent-Tiering for video storage, Amazon OpenSearch for metadata indexing, and Lambda functions for face blurring with Rekognition",
       "AWS IoT Core for camera management, Amazon IVS for video ingestion, Rekognition Video for analysis, SageMaker Neo for edge deployment, DynamoDB for metadata, S3 Glacier for storage, and EC2 with GPU for custom processing",
       "Direct camera integration to EC2 with NVIDIA GPUs, custom YOLO models for detection, Amazon Neptune for person tracking graphs, EFS for video storage, ElastiCache for metadata, and Batch for model training",
       "CloudFront for video ingestion, Lambda for initial processing, Textract for text detection, Comprehend for analysis, S3 for storage, Athena for queries, and Mechanical Turk for labeling"
   ],
   correct: 0,
   explanation: {
       correct: "Kinesis Video Streams handles massive concurrent 4K streams with built-in durability, Rekognition Custom Labels enables training models for 500 specific object types, Panorama provides edge inference for <2 second detection, SageMaker offers scalable custom model training per customer, S3 Intelligent-Tiering optimizes 30-day storage costs, OpenSearch enables fast metadata searches for instant replay, and Lambda with Rekognition provides serverless real-time face blurring for privacy.",
       whyWrong: {
           1: "IVS is for live streaming to viewers not security analysis, and SageMaker Neo alone doesn't provide edge infrastructure like Panorama",
           2: "Direct EC2 integration lacks scalability for 10,000 cameras, and EFS isn't cost-effective for 30 days of 4K video storage",
           3: "CloudFront isn't designed for camera ingestion, and Textract/Comprehend are for documents not video analysis"
       },
       examStrategy: "For video analysis at scale: Kinesis Video Streams for ingestion, Rekognition for AI/ML, Panorama for edge ML. S3 Intelligent-Tiering optimizes storage costs. Always address privacy requirements explicitly."
   }
},

// Continuing questions 71-80...
{
   id: 'sap_071',
   domain: "Domain 3: Continuous Improvement for Existing Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A streaming service operates globally with 50 million subscribers. Current architecture uses CloudFront → 500 EC2 instances across 6 regions → Multi-region Aurora MySQL. Issues include: $2M monthly AWS bill, 40% of compute capacity unused during off-peak, 15-second video start time, regional failover takes 10 minutes causing customer churn, and personalization algorithm takes 24 hours to update. Target: 50% cost reduction and 3-second video start time.",
   question: "Which optimization strategy BEST achieves both aggressive cost and performance targets?",
   options: [
       "Implement CloudFront Origin Shield with cache optimization, replace EC2 with ECS Fargate Spot for stateless transcoding, Aurora Global Database with write forwarding for <1 second failover, S3 Intelligent-Tiering for video assets, Amazon Personalize for real-time recommendations, and Compute Savings Plans for remaining infrastructure",
       "Add more CloudFront edge locations, implement EC2 Auto Scaling with predictive scaling, Aurora read replicas in all regions, ElastiCache for session caching, SageMaker for personalization, and Reserved Instances for baseline capacity",
       "Migrate to Lambda@Edge for dynamic content, implement Kubernetes with Karpenter, DynamoDB Global Tables for metadata, S3 Transfer Acceleration, custom ML on EC2, and Spot Instances for everything",
       "Use CloudFront Functions for personalization, containerize on App Runner, migrate to Timestream for analytics, implement Kinesis for streaming, Neptune for recommendations, and on-demand pricing for flexibility"
   ],
   correct: 0,
   explanation: {
       correct: "Origin Shield reduces origin requests by 88% cutting transfer costs significantly, Fargate Spot for stateless transcoding saves 70% over EC2, Aurora Global with write forwarding enables <1 second failover preventing churn, S3 Intelligent-Tiering automatically optimizes storage costs for massive video libraries, Personalize provides real-time recommendations vs 24-hour batch, and Compute Savings Plans add 27% additional savings - combining to exceed 50% cost reduction while improving performance.",
       whyWrong: {
           1: "Adding edge locations increases costs, predictive scaling helps but doesn't address 40% waste, and 24-hour SageMaker batch doesn't improve personalization speed",
           2: "Lambda@Edge has payload limits for video, Karpenter adds complexity, and Spot for everything risks availability issues for customer-facing services",
           3: "CloudFront Functions are too limited for complex personalization, App Runner doesn't suit video workloads, and Timestream is for IoT not video streaming"
       },
       examStrategy: "For video streaming optimization: Origin Shield is crucial for CDN costs. Fargate Spot works well for stateless media processing. Aurora Global write forwarding enables true active-active multi-region."
   }
},
{
   id: 'sap_072',
   domain: "Domain 4: Accelerate Workload Migration and Modernization",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A 150-year-old insurance company must migrate from multiple data centers to AWS. Systems include: AS/400 with RPG programs for policy management, 30-year-old actuarial models in FORTRAN, Windows-based call center applications, 500TB of scanned documents dating to 1920s, modern web applications, and real-time integration with 1000+ insurance agencies. Migration must maintain ISO 27001 certification and complete core systems within 12 months.",
   question: "Which migration approach handles this diversity of legacy systems while maintaining compliance?",
   options: [
       "AWS Migration Hub Orchestra for coordination, Mainframe Modernization Service for AS/400 migration to cloud-native, High Performance Computing (HPC) on AWS Batch for FORTRAN models, Amazon Connect for call center modernization, S3 Intelligent-Tiering with Amazon Textract for document digitization, and AWS App2Container for modern apps",
       "Lift-and-shift AS/400 to EC2, containerize FORTRAN with Singularity on ECS, Amazon WorkSpaces for call center, S3 Glacier for documents, replatform web apps to Elastic Beanstalk, and Direct Connect for agency connectivity",
       "Rewrite everything in microservices on Lambda, replace actuarial models with SageMaker, implement Amazon Chime for call center, scan documents to DynamoDB, containerize on EKS, and API Gateway for partner integration",
       "AWS Outposts for AS/400 hosting, keep FORTRAN on-premises with hybrid connectivity, Citrix on AWS for call center, Storage Gateway for documents, lift-and-shift web apps, and Site-to-Site VPN for agencies"
   ],
   correct: 0,
   explanation: {
       correct: "Migration Hub Orchestra provides centralized coordination across diverse workloads, Mainframe Modernization handles AS/400 with RPG properly, AWS Batch with HPC optimizes FORTRAN performance while maintaining algorithms, Connect modernizes call center with built-in compliance, S3 Intelligent-Tiering manages 500TB cost-effectively while Textract extracts searchable text, and App2Container accelerates modern app migration - all maintaining ISO 27001.",
       whyWrong: {
           1: "Lift-and-shift AS/400 to EC2 lacks proper RPG runtime support, and Glacier makes documents inaccessible for daily operations",
           2: "Complete rewrite in 12 months is impossible for 150 years of systems, and loses critical business logic in legacy code",
           3: "Outposts for AS/400 doesn't reduce data center footprint, and keeping FORTRAN on-premises doesn't achieve cloud benefits"
       },
       examStrategy: "For complex legacy migrations: Migration Hub Orchestra coordinates diverse workloads. Mainframe Modernization handles AS/400. Preserve critical algorithms (FORTRAN) while modernizing infrastructure."
   }
},
{
   id: 'sap_073',
   domain: "Domain 1: Design Solutions for Organizational Complexity",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A multinational energy company operates wind farms, solar plants, and traditional power stations across 25 countries. Each facility has its own AWS account for operational technology (OT) systems. The company needs unified energy production monitoring, predictive maintenance across all assets, compliance with different national grid regulations, real-time energy trading capabilities, and carbon footprint tracking. The solution must handle 10 million IoT sensors and integrate with legacy SCADA systems.",
   question: "Which architecture BEST provides unified operations while respecting OT/IT segregation and regulations?",
   options: [
       "AWS IoT SiteWise for industrial data aggregation with edge gateways, AWS IoT TwinMaker for unified asset visualization, Amazon Timestream for time-series storage, SageMaker for predictive maintenance models, AWS Data Exchange for energy market integration, and AWS Organizations with SCPs for regulatory compliance per country",
       "AWS IoT Core for sensor management, Amazon MSK for data streaming, S3 Data Lake with Glue, Redshift for analytics, QuickSight for dashboards, and Control Tower for governance",
       "AWS IoT Greengrass for edge computing, Kinesis Data Streams for ingestion, DynamoDB for real-time data, EMR for big data processing, Forecast for predictions, and CloudFormation StackSets for multi-account deployment",
       "AWS Outposts at each facility, Direct Connect network mesh, centralized EKS cluster, Prometheus for monitoring, Grafana for visualization, and Lambda for trading automation"
   ],
   correct: 0,
   explanation: {
       correct: "IoT SiteWise is purpose-built for industrial OT data with SCADA integration via OPC-UA, TwinMaker provides digital twins for unified visualization across facilities, Timestream efficiently handles 10M sensors' time-series data with automatic tiering, SageMaker enables predictive maintenance models, Data Exchange provides real-time market data for energy trading, and Organizations SCPs enforce country-specific grid regulations while maintaining OT/IT segregation.",
       whyWrong: {
           1: "Generic IoT Core lacks industrial protocols for SCADA, and MSK doesn't provide OT-specific features like asset modeling",
           2: "Greengrass alone doesn't provide asset hierarchies needed for energy facilities, and Forecast is for business metrics not industrial predictive maintenance",
           3: "Outposts at 25 countries' facilities is extremely expensive, and Prometheus/Grafana lacks industrial data modeling capabilities"
       },
       examStrategy: "For industrial IoT/OT: IoT SiteWise is the key service for SCADA integration. IoT TwinMaker provides digital twin visualization. Data Exchange enables real-time market data integration."
   }
},
{
   id: 'sap_074',
   domain: "Domain 2: Design for New Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A quantum computing research consortium is building a hybrid classical-quantum computing platform. Requirements: manage quantum circuit execution across multiple quantum hardware providers, classical pre/post-processing requiring 1000+ GPU nodes, store and analyze 100TB of quantum experiment results daily, provide researcher collaboration tools for 10,000 scientists globally, maintain quantum algorithm IP protection, and achieve <100ms latency between classical and quantum processing.",
   question: "Which architecture BEST supports this cutting-edge hybrid quantum-classical platform?",
   options: [
       "Amazon Braket for quantum computing with multiple QPU backends, AWS ParallelCluster with P4d instances for GPU computing, Amazon FSx for Lustre for high-performance storage, AWS CodeCommit with fine-grained permissions for IP protection, SageMaker notebooks for collaboration, and AWS Direct Connect to quantum facilities",
       "EC2 with NVIDIA GPUs for classical compute, API Gateway to quantum providers, S3 for data storage, GitHub Enterprise for code, Jupyter Hub on EKS for collaboration, and VPN connections to quantum centers",
       "AWS Batch with GPU compute environments, Lambda for quantum job orchestration, DynamoDB for experiment metadata, EFS for shared storage, Cloud9 for development, and Transit Gateway for network connectivity",
       "ECS with GPU tasks, Step Functions for workflow orchestration, Redshift for analytics, CodeArtifact for algorithm sharing, WorkDocs for collaboration, and PrivateLink to quantum services"
   ],
   correct: 0,
   explanation: {
       correct: "Braket provides native integration with multiple quantum hardware providers (IBM, Rigetti, IonQ) with optimized classical-quantum interaction, ParallelCluster with P4d delivers massive GPU scale needed for pre/post-processing, FSx for Lustre handles 100TB daily with sub-millisecond latency required for <100ms processing, CodeCommit with IAM provides fine-grained IP protection, SageMaker notebooks enable secure collaborative research, and Direct Connect ensures reliable low-latency connectivity to quantum facilities.",
       whyWrong: {
           1: "Building custom API integration to quantum providers adds complexity and latency vs native Braket service, and GitHub Enterprise lacks fine-grained AWS IAM integration",
           2: "Batch doesn't provide the HPC cluster features needed for tightly-coupled GPU workloads, and DynamoDB isn't suitable for 100TB daily scientific data",
           3: "ECS doesn't provide HPC scheduling needed for quantum workflows, and WorkDocs isn't designed for computational research collaboration"
       },
       examStrategy: "Amazon Braket is AWS's quantum computing service - know it exists. ParallelCluster is for HPC workloads. FSx for Lustre is the go-to for scientific computing storage."
   }
},
{
   id: 'sap_075',
   domain: "Domain 3: Continuous Improvement for Existing Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "An e-learning platform with 20 million students runs on: 200 EC2 instances, RDS PostgreSQL Multi-AZ, 50TB of video content in S3, and CloudFront. Problems: PostgreSQL vacuum operations cause 30-minute outages during exams, S3 costs $40,000/month for rarely-accessed old courses, CloudFront invalidation takes 20 minutes affecting content updates, EC2 scaling during semester start causes 5-minute delays, and real-time collaboration features have 500ms latency.",
   question: "Which optimization strategy MOST comprehensively addresses all performance and cost issues?",
   options: [
       "Migrate to Aurora PostgreSQL with vacuum processing offload, implement S3 Intelligent-Tiering for automatic storage optimization, use CloudFront versioned URLs instead of invalidations, implement EC2 warm pools for faster scaling, and add AWS AppSync for real-time collaboration with WebSocket subscriptions",
       "Add read replicas for vacuum isolation, manually move old content to Glacier, increase CloudFront cache TTLs, use larger EC2 instances to avoid scaling, and implement WebSockets on ALB",
       "Switch to DynamoDB for zero-maintenance, use S3 lifecycle policies with fixed rules, implement Lambda@Edge for dynamic content, add more EC2 instances preemptively, and use ElastiCache for real-time features",
       "Implement Amazon RDS Proxy, use S3 Storage Lens for optimization recommendations, add CloudFront behaviors for different content types, use Spot instances for cost savings, and implement Server-Sent Events for real-time"
   ],
   correct: 0,
   explanation: {
       correct: "Aurora PostgreSQL handles vacuum operations without downtime through storage layer optimization, S3 Intelligent-Tiering automatically moves objects between tiers saving 60%+ on storage, versioned URLs eliminate invalidation delays enabling instant updates, warm pools maintain pre-initialized instances reducing scaling time to seconds, and AppSync provides managed GraphQL with WebSocket subscriptions achieving <100ms latency for collaboration.",
       whyWrong: {
           1: "Read replicas don't solve vacuum locking on primary, manual Glacier movement is error-prone, and WebSockets on ALB requires complex session affinity",
           2: "DynamoDB migration requires complete application rewrite, fixed lifecycle rules don't adapt to access patterns, and preemptive scaling wastes money",
           3: "RDS Proxy doesn't solve vacuum issues, Storage Lens only provides recommendations not automation, and Server-Sent Events are one-way only"
       },
       examStrategy: "Aurora PostgreSQL solves many RDS operational issues including vacuum. S3 Intelligent-Tiering is superior to manual lifecycle rules. Warm pools are key for predictable scaling events."
   }
},
{
   id: 'sap_076',
   domain: "Domain 4: Accelerate Workload Migration and Modernization",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A 200-hospital healthcare network is migrating to AWS with: 500 clinical applications, 10PB of medical imaging, Epic EHR system, real-time HL7 interfaces to 5000 medical devices, on-premises Active Directory with 100,000 users, and legacy Visual Basic applications. Requirements: HIPAA compliance, 99.99% uptime for critical systems, maintain all integrations during migration, complete in 18 months, and enable AI-driven diagnostics post-migration.",
   question: "Which migration strategy ensures healthcare continuity while enabling innovation?",
   options: [
       "AWS HealthLake for clinical data aggregation with FHIR APIs, Application Migration Service for bulk application migration, DataSync with ongoing sync for PACS imaging, AWS HealthImaging for DICOM storage and AI/ML, AD Connector for authentication continuity, App2Container for VB apps, and AWS Batch for HL7 processing",
       "Lift-and-shift everything to EC2, implement Direct Connect for reliability, use Storage Gateway for imaging, keep Active Directory on-premises, manually modernize VB apps, and build custom HL7 interfaces",
       "Complete cloud-native rebuild with microservices, replace Epic with custom solution, implement Cognito for authentication, store images in S3, use Lambda for all processing, and API Gateway for interfaces",
       "VMware Cloud on AWS for minimal change, AWS Backup for data protection, FSx for Windows for file shares, migrate AD to AWS Managed AD, keep legacy apps unchanged, and use Kinesis for HL7 streaming"
   ],
   correct: 0,
   explanation: {
       correct: "HealthLake aggregates clinical data with FHIR standards enabling AI while maintaining Epic, MGN rapidly migrates 500 applications meeting 18-month timeline, DataSync maintains imaging availability during migration, HealthImaging provides DICOM-native storage with ML integration, AD Connector maintains authentication without disruption, App2Container modernizes VB apps without rewriting, and Batch processes HL7 messages reliably at scale.",
       whyWrong: {
           1: "Pure lift-and-shift doesn't enable AI diagnostics goal, and custom HL7 interfaces are risky for critical medical device integrations",
           2: "Complete rebuild of 500 apps in 18 months is impossible, and replacing Epic would face massive clinical resistance and risk",
           3: "VMware Cloud is expensive at this scale, and unchanged legacy apps prevent innovation goals"
       },
       examStrategy: "For healthcare migrations: HealthLake and HealthImaging are purpose-built services. Maintain critical systems (Epic, AD) during migration. App2Container modernizes legacy apps without rewriting."
   }
},
{
   id: 'sap_077',
   domain: "Domain 1: Design Solutions for Organizational Complexity",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A global automotive manufacturer has 200 AWS accounts across design, manufacturing, supply chain, and dealers. New requirements: implement zero-trust network architecture, enable secure data sharing with 10,000 suppliers, comply with TISAX Level 3 for automotive security, provide isolated development environments for each of 500 engineering teams, centralize threat detection across OT and IT systems, and maintain less than 1-hour recovery time for ransomware attacks.",
   question: "Which security architecture MOST comprehensively addresses these automotive industry requirements?",
   options: [
       "AWS Verified Access for zero-trust application access, AWS Clean Rooms for secure supplier data collaboration, AWS Audit Manager with TISAX compliance framework, AWS Service Catalog with account vending for team isolation, Amazon Security Lake for unified OT/IT threat detection, and AWS Backup with vault lock and cross-region replication for ransomware recovery",
       "AWS PrivateLink for all connections, AWS Data Exchange for supplier sharing, AWS Config for compliance, AWS Organizations for account management, Amazon GuardDuty for threat detection, and snapshots for backup",
       "Transit Gateway with security domains, S3 with bucket policies for sharing, AWS Security Hub for compliance, Control Tower for accounts, Amazon Detective for investigation, and AWS Elastic Disaster Recovery",
       "AWS Network Firewall everywhere, Direct Connect with partners, Macie for data protection, SSO for access management, CloudWatch for monitoring, and AMI backups for recovery"
   ],
   correct: 0,
   explanation: {
       correct: "Verified Access provides true zero-trust without VPN complexity, Clean Rooms enables secure multi-party computation without raw data exposure perfect for supplier collaboration, Audit Manager has pre-built TISAX framework for automotive compliance, Service Catalog with account vending provides automated secure isolation for 500 teams, Security Lake aggregates both OT and IT security data for unified threat detection, and Backup with vault lock provides immutable backups with <1 hour recovery from ransomware.",
       whyWrong: {
           1: "PrivateLink alone doesn't provide zero-trust architecture, and Data Exchange doesn't provide the privacy-preserving compute of Clean Rooms needed for sensitive automotive data",
           2: "Transit Gateway is network-level not application-level zero-trust, and Elastic Disaster Recovery is for full DR not rapid ransomware recovery",
           3: "Network Firewall is perimeter-based not zero-trust, and Direct Connect with 10,000 suppliers is impractical and expensive"
       },
       examStrategy: "AWS Verified Access is the zero-trust service. Clean Rooms enables secure multi-party analytics. Security Lake unifies security data. Know industry-specific compliance (TISAX for automotive)."
   }
},
{
   id: 'sap_078',
   domain: "Domain 2: Design for New Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A space technology company is building a satellite constellation management platform. Requirements: track 500 satellites in real-time with orbital mechanics calculations, process 1TB of telemetry per satellite daily, command uplink with <500ms latency globally, collision avoidance predictions 7 days ahead, integration with ground station networks, store 10 years of mission data for analysis, and support mission planning simulations using quantum computing.",
   question: "Which architecture BEST supports these aerospace mission-critical requirements?",
   options: [
       "AWS Ground Station for satellite communication, Amazon Timestream for telemetry ingestion with 10-year retention, AWS Batch with C6i instances for orbital calculations, Amazon Forecast with custom algorithms for collision prediction, AWS IoT Core for command distribution, Amazon Braket for quantum simulations, and S3 Intelligent-Tiering for mission archives",
       "Direct ground station integration, Kinesis Data Streams for telemetry, Lambda for calculations, SageMaker for predictions, API Gateway for commands, EC2 for simulations, and Glacier for archives",
       "Satellite modems on EC2, MSK for data streaming, EMR for processing, Neptune for orbital graphs, AppSync for command interface, HPC cluster for simulations, and EFS for storage",
       "Custom ground software, DynamoDB for telemetry, Fargate for calculations, Comprehend for log analysis, Step Functions for commands, Quantum Ledger Database for simulations, and Redshift for analytics"
   ],
   correct: 0,
   explanation: {
       correct: "Ground Station provides managed satellite communication with global coverage and <500ms latency, Timestream efficiently handles massive telemetry with automatic hot/cold tiering for 10-year retention, Batch with C6i provides the compute power needed for complex orbital mechanics, Forecast with custom algorithms enables 7-day collision predictions, IoT Core reliably distributes commands globally, Braket enables quantum computing for advanced mission planning, and S3 Intelligent-Tiering optimizes long-term storage costs.",
       whyWrong: {
           1: "Building ground station integration is complex and lacks global coverage, and Lambda has timeout limitations for complex orbital calculations",
           2: "EC2-based ground stations lack redundancy and global reach, and Neptune is overkill for orbital calculations vs purpose-built physics simulations",
           3: "QLDB is a ledger database not for quantum computing, and Comprehend is for NLP not telemetry analysis"
       },
       examStrategy: "AWS Ground Station is the satellite communication service. Timestream excels at high-volume time-series data with long retention. Braket provides quantum computing capabilities."
   }
},
{
   id: 'sap_079',
   domain: "Domain 3: Continuous Improvement for Existing Solutions",
   difficulty: "medium",
   timeRecommendation: 150,
   scenario: "A social media application uses DynamoDB (on-demand mode) for user posts, spending $80,000/month. Analysis shows: 80% of reads are for posts <24 hours old, write traffic is steady at 5,000 WCU, read traffic varies from 1,000 to 50,000 RCU, hot partition issues during viral posts, and global secondary indexes (GSI) consume 40% of costs but are rarely used. The application needs 50% cost reduction while improving performance.",
   question: "Which optimization strategy BEST reduces costs while improving performance?",
   options: [
       "Switch to provisioned capacity with auto-scaling for predictable writes, implement DynamoDB Accelerator (DAX) for recent posts caching, use contributor insights to identify and fix hot partitions, remove unused GSIs and create sparse indexes where needed, and implement S3 archival for posts >30 days with DynamoDB Streams",
       "Keep on-demand mode for flexibility, add ElastiCache for all caching, partition tables by date, create local secondary indexes instead of GSIs, and move old data to RDS",
       "Switch everything to provisioned with reserved capacity, implement application-level caching, use scan operations instead of GSIs, increase partition keys, and compress all items",
       "Use provisioned for writes and on-demand for reads, add CloudFront for API caching, create composite keys, duplicate data to avoid GSIs, and implement pagination"
   ],
   correct: 0,
   explanation: {
       correct: "Provisioned capacity with auto-scaling reduces costs 65% for predictable writes while maintaining flexibility for reads, DAX provides microsecond latency for hot data reducing read costs, contributor insights identifies hot partitions for targeted fixes, removing unused GSIs saves 40% immediately, sparse indexes reduce costs further, and S3 archival via Streams moves cold data to cheaper storage while maintaining query ability.",
       whyWrong: {
           1: "Keeping on-demand for steady writes wastes money, and moving to RDS breaks DynamoDB-optimized access patterns",
           2: "Scan operations are extremely expensive compared to GSI queries, and reserved capacity reduces flexibility needed for variable reads",
           3: "Mixed provisioned/on-demand isn't supported on same table, and data duplication increases storage costs and consistency complexity"
       },
       examStrategy: "For DynamoDB optimization: DAX for caching hot data, contributor insights for hot partition diagnosis, sparse indexes for cost reduction. Provisioned capacity saves significantly for predictable workloads."
   }
},
{
   id: 'sap_080',
   domain: "Domain 4: Accelerate Workload Migration and Modernization",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A stock exchange is migrating its trading platform to AWS. The platform includes: ultra-low latency matching engine requiring <10 microsecond response, market data distribution to 50,000 subscribers, regulatory reporting system with 7-year audit trail, risk management requiring real-time position calculations, legacy FIX protocol gateways, and disaster recovery with <1 minute RTO. The migration cannot impact trading hours and must maintain FINRA compliance.",
   question: "Which migration approach ensures zero trading disruption while meeting extreme performance requirements?",
   options: [
       "AWS Local Zones for ultra-low latency with Nitro System enhanced networking, Amazon Managed Streaming for Kafka (MSK) for market data distribution, Amazon QLDB for immutable audit trail, Amazon MemoryDB for real-time risk calculations, AWS Mainframe Modernization for FIX protocol handling, and Aurora Global Database with write forwarding for <1 minute RTO",
       "AWS Outposts for on-premises latency, Kinesis Data Streams for market data, S3 with Object Lock for audit trail, ElastiCache for risk calculations, Direct Connect for FIX connectivity, and Multi-Region active-active for DR",
       "EC2 bare metal with SR-IOV, custom multicast for market data, DynamoDB for audit storage, Lambda for risk calculations, API Gateway for FIX translation, and pilot light DR strategy",
       "Wavelength for edge computing, EventBridge for market data, CloudTrail Lake for audit, SageMaker for risk models, App Mesh for FIX routing, and backup/restore for DR"
   ],
   correct: 0,
   explanation: {
       correct: "Local Zones provide metro-edge computing with single-digit microsecond latency via Nitro enhanced networking meeting <10μs requirement, MSK handles 50,000 subscribers with proven financial services scale, QLDB provides cryptographically verifiable immutable audit trail for FINRA compliance, MemoryDB offers microsecond latency with durability for risk calculations, Mainframe Modernization handles legacy FIX protocol without disruption, and Aurora Global write forwarding achieves <1 minute RTO with automatic failover.",
       whyWrong: {
           1: "Outposts still has AWS service latency overhead, and Kinesis has higher latency than MSK for financial markets",
           2: "Custom multicast is complex and risky for production trading, and Lambda cold starts conflict with microsecond requirements",
           3: "Wavelength is for mobile edge not financial trading, and backup/restore cannot achieve <1 minute RTO"
       },
       examStrategy: "For ultra-low latency financial systems: Local Zones provide metro-edge computing. MSK is preferred over Kinesis for financial services. QLDB provides immutable audit trails with cryptographic verification."
   }
},

// Continuing questions 81-90...
{
   id: 'sap_081',
   domain: "Domain 1: Design Solutions for Organizational Complexity",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A global consulting firm with 100,000 employees has 500 AWS accounts across client projects, internal systems, and R&D. Requirements include: complete client data isolation with proof of segregation for audits, centralized billing with chargeback to 2,000 cost centers, prevent consultants from accessing multiple client environments, automated decommissioning when projects end, compliance with SOC2, ISO 27001, and various client-specific standards, and unified security monitoring without data commingling.",
   question: "Which architecture BEST ensures client isolation while enabling operational efficiency?",
   options: [
       "AWS Control Tower with customized Account Factory for client-specific accounts, AWS Organizations with SCPs enforcing data boundaries, AWS IAM Identity Center with permission sets per client and automatic deprovisioning, AWS Cost Categories for chargeback allocation, AWS Audit Manager for multi-framework compliance, and Amazon Security Lake with delegated admin per client segment",
       "AWS Organizations with separate OUs per client, AWS SSO with Active Directory integration, manual account creation process, Cost Explorer with tags, AWS Config for compliance, and centralized CloudTrail logging",
       "AWS Landing Zone for account vending, IAM roles with external IDs, consolidated billing with manual allocation, Security Hub for compliance, GuardDuty for threat detection, and separate log archives per client",
       "Multiple AWS Organizations for client separation, SAML federation for access, spreadsheet-based cost tracking, third-party SIEM for security, manual compliance audits, and S3 buckets for logs"
   ],
   correct: 0,
   explanation: {
       correct: "Control Tower with customized Account Factory automates compliant account provisioning with built-in isolation, SCPs provide preventive controls ensuring data boundaries that satisfy audit requirements, IAM Identity Center permission sets with automatic lifecycle management prevents cross-client access and handles deprovisioning, Cost Categories enable precise chargeback to 2,000 cost centers, Audit Manager provides evidence collection across multiple compliance frameworks, and Security Lake with delegated admin maintains security visibility while preserving data isolation.",
       whyWrong: {
           1: "Manual account creation doesn't scale for project velocity, and centralized CloudTrail violates client data isolation requirements",
           2: "Landing Zone is deprecated, and separate log archives increase operational complexity without improving isolation",
           3: "Multiple Organizations breaks centralized billing and increases management overhead, and spreadsheet tracking is error-prone for 2,000 cost centers"
       },
       examStrategy: "For complex multi-tenant scenarios: Control Tower provides governance at scale. Cost Categories enable sophisticated chargeback. Security Lake with delegated admin maintains isolation while enabling monitoring."
   }
},
{
   id: 'sap_082',
   domain: "Domain 2: Design for New Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A defense contractor is building a battlefield simulation platform for military training. Requirements: simulate 100,000 concurrent entities (vehicles, soldiers, drones), real-time physics with terrain deformation, multi-spectral sensor simulation (visual, IR, radar), encrypted communications with classification levels, support for global exercises with 10,000 participants, after-action review with complete replay capability, and operation in disconnected/denied environments.",
   question: "Which architecture BEST supports military-grade simulation requirements?",
   options: [
       "AWS GovCloud with IL5 compliance, Amazon EC2 P4d instances for GPU simulation, AWS ParallelCluster for distributed physics, Amazon Timestream for entity state tracking, AWS KMS with CloudHSM for encryption, Amazon Kinesis Video Streams for replay capability, and AWS Snowball Edge for disconnected operations with AWS IoT Greengrass",
       "Standard AWS with compliance programs, Lambda for entity logic, DynamoDB for state management, SageMaker for physics, Secrets Manager for encryption, S3 for replay storage, and Direct Connect for reliability",
       "AWS Outposts for on-premise deployment, ECS for containerized simulation, RDS for entity tracking, Nitro Enclaves for encryption, ElastiCache for state synchronization, and EBS snapshots for replay",
       "EC2 with placement groups, Step Functions for simulation orchestration, Neptune for entity relationships, Parameter Store for secrets, CloudWatch for replay, and VPN for connectivity"
   ],
   correct: 0,
   explanation: {
       correct: "GovCloud provides IL5 compliance required for defense, P4d instances deliver massive GPU power for physics and sensor simulation, ParallelCluster enables distributed computing for 100,000 entities, Timestream efficiently tracks temporal entity states, CloudHSM provides FIPS 140-2 Level 3 encryption for classification levels, Kinesis Video Streams captures complete simulation for replay, and Snowball Edge with Greengrass enables disconnected training operations in denied environments.",
       whyWrong: {
           1: "Lambda lacks persistent state for complex simulations, and standard AWS may not meet defense compliance requirements",
           2: "Outposts requires connectivity defeating disconnected operation requirement, and EBS snapshots don't capture real-time simulation flow",
           3: "Step Functions isn't designed for real-time physics simulation, and VPN doesn't support disconnected operations"
       },
       examStrategy: "For defense/military workloads: GovCloud for compliance, CloudHSM for encryption requirements, Snowball Edge enables disconnected operations. ParallelCluster for HPC simulation workloads."
   }
},
{
   id: 'sap_083',
   domain: "Domain 3: Continuous Improvement for Existing Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A ride-sharing platform processes 500,000 rides hourly across 200 cities. Current architecture: monolithic Node.js application on 300 t3.xlarge instances, PostgreSQL RDS with 15 read replicas, Redis for real-time driver locations, and REST APIs. Issues: 30-second driver assignment delays during rush hours, database CPU at 95%, $400,000 monthly costs, inability to implement surge pricing in real-time, and 10% timeout errors on payment processing.",
   question: "Which modernization approach BEST resolves all issues while enabling real-time features?",
   options: [
       "Decompose into microservices on EKS with KEDA autoscaling, implement Amazon MemoryDB for driver location with geo-queries, migrate to Aurora Serverless v2 for automatic scaling, use Amazon EventBridge for event-driven surge pricing, implement AWS Step Functions for payment orchestration with error handling, and GraphQL with AWS AppSync for efficient mobile APIs",
       "Scale to 600 instances, add more RDS replicas, implement application-level caching, add Kinesis for real-time processing, use Lambda for surge calculations, and implement circuit breakers",
       "Migrate to Lambda for serverless, DynamoDB for NoSQL performance, ElastiCache for all caching, API Gateway for APIs, SQS for payment queue, and CloudWatch for monitoring",
       "Containerize on Fargate, implement service mesh with App Mesh, use DocumentDB for flexibility, add Kafka for streaming, implement Cognito for authentication, and X-Ray for tracing"
   ],
   correct: 0,
   explanation: {
       correct: "EKS with KEDA provides Kubernetes Event-Driven Autoscaling ideal for traffic patterns, MemoryDB offers Redis compatibility with built-in geo-queries reducing driver assignment to <3 seconds, Aurora Serverless v2 eliminates database bottlenecks with automatic scaling, EventBridge enables real-time event-driven surge pricing, Step Functions handles payment complexity with built-in error handling reducing timeouts to near-zero, and AppSync provides efficient GraphQL reducing mobile bandwidth 60% and costs.",
       whyWrong: {
           1: "Simply adding more resources doesn't solve architectural issues and increases costs further without improving features",
           2: "Full serverless migration is risky for complex stateful ride-sharing logic, and DynamoDB requires complete data model redesign",
           3: "DocumentDB doesn't solve PostgreSQL performance issues, and adding service mesh increases complexity without addressing core problems"
       },
       examStrategy: "For modernization: KEDA enables advanced Kubernetes autoscaling. MemoryDB provides durable Redis with geo-queries. EventBridge excels at event-driven architectures. Step Functions handles complex orchestration."
   }
},
{
   id: 'sap_084',
   domain: "Domain 4: Accelerate Workload Migration and Modernization",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A national tax authority must migrate its citizen services platform from mainframe to AWS before the next tax season (6 months). The system processes 50 million tax returns annually, integrates with 200 government agencies, stores 40 years of historical data (2PB), runs 10,000 COBOL programs, peaks at 1 million concurrent users on deadline day, and must maintain legal compliance for data residency and audit trails.",
   question: "Which migration strategy ensures tax season readiness while maintaining compliance?",
   options: [
       "AWS Mainframe Modernization with Micro Focus for rapid rehosting, implement Amazon API Gateway with caching for citizen portal, use AWS B2B Data Interchange for agency integrations, migrate historical data to S3 with Glacier Deep Archive for old records, implement Auto Scaling with predictive scaling for deadline day, and use AWS CloudTrail Lake for permanent audit trails",
       "Rewrite everything in microservices on Lambda, implement DynamoDB for citizen data, use EventBridge for agency communication, store all data in S3, handle peaks with reserved concurrency, and use CloudWatch Logs for auditing",
       "Hybrid approach with mainframe on Outposts, new citizen portal on ECS, keep existing integrations, replicate data to RDS, use Spot instances for peak capacity, and implement custom audit solution",
       "Lift-and-shift COBOL to EC2, build new React frontend, implement REST APIs for agencies, migrate to PostgreSQL, use CloudFront for scaling, and store audits in DynamoDB"
   ],
   correct: 0,
   explanation: {
       correct: "Mainframe Modernization with Micro Focus enables rapid rehosting meeting 6-month deadline while preserving COBOL logic, API Gateway with caching handles citizen portal traffic efficiently, B2B Data Interchange provides managed EDI/file transfer for government integrations, S3 with Glacier Deep Archive cost-effectively stores 40 years of data, predictive scaling anticipates deadline day surge preventing outages, and CloudTrail Lake provides immutable audit trails meeting legal requirements.",
       whyWrong: {
           1: "Rewriting 10,000 COBOL programs in 6 months is impossible, and Lambda has complexity limits for tax calculations",
           2: "Outposts for mainframe adds cost and complexity, and Spot instances are inappropriate for critical tax deadline processing",
           3: "Lift-and-shift doesn't leverage cloud benefits, and PostgreSQL migration requires extensive data transformation for mainframe data"
       },
       examStrategy: "For urgent mainframe migrations: rehosting is fastest, modernization comes later. B2B Data Interchange handles EDI/government integrations. CloudTrail Lake provides compliant audit storage."
   }
},
{
   id: 'sap_085',
   domain: "Domain 1: Design Solutions for Organizational Complexity",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A Fortune 500 company completed 20 acquisitions creating 300 AWS accounts with different naming conventions, tagging strategies, network architectures, and security tools. The CFO demands consolidated reporting, the CISO requires unified security posture, DevOps teams need self-service capabilities, and the board wants 30% cost reduction. Integration must complete in 90 days without disrupting operations.",
   question: "Which approach BEST achieves rapid integration while meeting all stakeholder requirements?",
   options: [
       "Implement AWS Control Tower Account Factory for Terraform (AFT) to standardize existing accounts, use AWS Organizations Resource Control Policies for tag enforcement, deploy AWS Transit Gateway for network consolidation, enable AWS Security Hub with automated remediation, implement AWS Service Catalog for self-service, and use Cost Intelligence Dashboard with AWS Compute Optimizer for cost reduction",
       "Manually reorganize accounts into OUs, create tagging policies, peer VPCs individually, deploy GuardDuty in each account, build custom portal for self-service, and use spreadsheets for cost tracking",
       "Create new Control Tower organization and migrate all accounts, enforce strict naming convention, rebuild all networks, centralize all security tools, restrict all self-service during transition, and implement FinOps team",
       "Keep existing structure, use Cost Explorer for reporting, add Security Hub without remediation, maintain separate networks, allow teams to continue current practices, and negotiate Enterprise Discount Program"
   ],
   correct: 0,
   explanation: {
       correct: "Control Tower AFT standardizes accounts without recreation meeting 90-day timeline, Resource Control Policies enforce tagging retroactively enabling CFO reporting, Transit Gateway consolidates networks without rebuilding, Security Hub with automation provides CISO's unified security posture, Service Catalog maintains DevOps self-service while adding governance, and Cost Intelligence Dashboard with Compute Optimizer identifies 30%+ savings opportunities through rightsizing and modernization.",
       whyWrong: {
           1: "Manual processes won't complete in 90 days for 300 accounts, and spreadsheet cost tracking lacks real-time visibility",
           2: "Migrating 300 accounts would be massively disruptive and exceed 90-day timeline",
           3: "Maintaining status quo doesn't achieve consolidation goals or cost reduction targets"
       },
       examStrategy: "For M&A integration: AFT enables Control Tower standardization without migration. Resource Control Policies retroactively enforce governance. Cost Intelligence Dashboard provides FinOps visibility."
   }
},
{
   id: 'sap_086',
   domain: "Domain 2: Design for New Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "An agricultural technology company is building a precision farming platform managing 10 million acres globally. Requirements: process satellite imagery for crop health (100TB daily), IoT sensors for soil moisture/weather (50M data points/hour), drone video for pest detection, ML models for yield prediction, real-time irrigation control, integration with farm equipment (John Deere, etc.), and offline operation for rural areas with satellite internet.",
   question: "Which architecture BEST supports global precision agriculture at scale?",
   options: [
       "Amazon SageMaker Geospatial for satellite imagery ML analysis, AWS IoT Core with Basic Ingest for sensor data, Amazon Rekognition Custom Labels for pest detection in drone footage, AWS IoT FleetWise for equipment integration, Amazon Forecast for yield prediction, AWS IoT Greengrass for edge irrigation control, and AWS Ground Station with Snowball Edge for offline sync",
       "EC2 with GPU for image processing, Kinesis for IoT ingestion, Lambda for ML inference, custom APIs for equipment, Redshift for analytics, Direct Connect for reliability, and manual offline handling",
       "S3 for imagery storage, DynamoDB for sensor data, Batch for processing, generic ML on SageMaker, RDS for farm data, API Gateway for integrations, and cache data locally",
       "ECS for containerized processing, Timestream for sensors, Comprehend for analysis, QuickSight for visualization, AppSync for APIs, EventBridge for automation, and replicate to on-premise"
   ],
   correct: 0,
   explanation: {
       correct: "SageMaker Geospatial is purpose-built for satellite imagery analysis with agricultural ML models, IoT Core Basic Ingest reduces costs for 50M points/hour, Rekognition Custom Labels enables training specific pest detection models, IoT FleetWise handles proprietary agricultural equipment protocols, Forecast provides time-series yield prediction, Greengrass enables local irrigation control during connectivity loss, and Ground Station with Snowball Edge provides satellite downlink with offline operation for rural deployments.",
       whyWrong: {
           1: "Generic EC2 GPU lacks geospatial ML capabilities, and manual offline handling doesn't scale across millions of acres",
           2: "Generic SageMaker lacks geospatial features, and RDS isn't optimal for IoT time-series data at this scale",
           3: "Comprehend is for text not agricultural analysis, and on-premise replication defeats cloud advantages"
       },
       examStrategy: "SageMaker Geospatial is specialized for satellite imagery ML. IoT FleetWise handles proprietary protocols. Greengrass enables edge computing for offline operations. Ground Station provides satellite connectivity."
   }
},
{
   id: 'sap_087',
   domain: "Domain 3: Continuous Improvement for Existing Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A cryptocurrency exchange handles $10B daily volume with infrastructure on AWS: 1000 c5.24xlarge instances for matching engine, DynamoDB for order book (costing $200K/month), PostgreSQL RDS for user accounts, Redis cluster for market data, and multi-region deployment. Issues: 15ms latency between regions affecting arbitrage, DynamoDB costs growing 20% monthly, 5-minute failover time, and inability to handle flash crashes with 100x normal volume.",
   question: "Which optimization strategy BEST addresses latency, costs, and reliability for financial markets?",
   options: [
       "Deploy AWS Local Zones in financial centers for <1ms latency, implement DynamoDB on-demand with reserved capacity for baseline load, use Aurora Global Database with write forwarding for <1 second failover, implement AWS Application Auto Scaling with custom CloudWatch metrics for flash crash handling, and Amazon MemoryDB replacing Redis for durability with performance",
       "Add more regions for proximity, use DynamoDB auto-scaling, implement read replicas, upgrade Redis, and add more EC2 instances for peak capacity",
       "Implement AWS Global Accelerator, partition DynamoDB by region, use Multi-AZ RDS, implement ElastiCache, and use Spot instances for cost savings",
       "Use CloudFront for API acceleration, compress DynamoDB items, implement connection pooling, cache everything in Redis, and implement rate limiting"
   ],
   correct: 0,
   explanation: {
       correct: "Local Zones in financial centers (NYC, London, Tokyo) provide <1ms latency critical for arbitrage, DynamoDB reserved capacity reduces costs 75% for predictable baseline while on-demand handles spikes, Aurora Global write forwarding achieves sub-second failover meeting exchange requirements, custom CloudWatch metrics with Application Auto Scaling handles 100x flash crash volumes, and MemoryDB provides Redis performance with Multi-AZ durability preventing data loss during failures.",
       whyWrong: {
           1: "Simply adding infrastructure doesn't solve architectural latency issues and increases costs without addressing root causes",
           2: "Global Accelerator doesn't reduce compute latency, and Spot instances are inappropriate for critical trading infrastructure",
           3: "CloudFront adds latency for real-time trading, and rate limiting during flash crashes could cause market manipulation issues"
       },
       examStrategy: "For financial markets: Local Zones provide ultra-low latency in financial centers. Aurora Global write forwarding enables true active-active. MemoryDB combines Redis performance with durability."
   }
},
{
   id: 'sap_088',
   domain: "Domain 4: Accelerate Workload Migration and Modernization",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A 100-year-old insurance company is migrating from multiple data centers including: IBM z/OS mainframe with IMS database, AS/400 systems for claims, Sun SPARC servers running Solaris, Windows servers with .NET applications, 5PB of documents in EMC storage, and Citrix VDI for 20,000 users. Migration must maintain business continuity, complete in 18 months, reduce costs 40%, and enable modern digital services.",
   question: "Which comprehensive migration strategy addresses this heterogeneous environment?",
   options: [
       "AWS Mainframe Modernization Service for z/OS and AS/400 systems using dual-run approach, AWS Application Migration Service for SPARC/Solaris/Windows servers, AWS DataSync with File Gateway for EMC migration maintaining CIFS/NFS access, Amazon WorkSpaces replacing Citrix VDI, AWS Database Migration Service for IMS to Aurora PostgreSQL, and Savings Plans achieving 40% cost reduction",
       "Lift-and-shift everything to EC2, keep all databases as-is, use Storage Gateway for files, maintain Citrix on AWS, implement Direct Connect, and negotiate volume discounts",
       "Rewrite all legacy systems in cloud-native, replace mainframe with microservices, migrate to NoSQL databases, implement S3 for all storage, use AppStream for VDI, and go serverless",
       "Keep mainframe on-premises with Outposts, migrate only Windows to AWS, use hybrid storage, maintain Citrix on-premises, implement VPN connectivity, and partial cloud adoption"
   ],
   correct: 0,
   explanation: {
       correct: "Mainframe Modernization handles both z/OS and AS/400 with dual-run ensuring continuity, MGN seamlessly migrates SPARC/Solaris/Windows preserving configurations, DataSync with File Gateway maintains file protocol compatibility during 5PB migration, WorkSpaces provides superior VDI experience vs Citrix at lower cost, DMS with SCT converts IMS hierarchical to PostgreSQL relational, and Savings Plans deliver 40% savings on modernized infrastructure.",
       whyWrong: {
           1: "Pure lift-and-shift doesn't achieve 40% cost reduction and maintains legacy complexity without enabling digital services",
           2: "Complete rewrite of 100 years of systems in 18 months is impossible and extremely risky for insurance operations",
           3: "Partial migration doesn't achieve cost targets and maintains data center expenses while adding cloud costs"
       },
       examStrategy: "For heterogeneous migrations: Mainframe Modernization handles multiple legacy platforms. MGN works for various OS types. WorkSpaces is the AWS VDI solution. Combine multiple migration tools for complex environments."
   }
},
{
   id: 'sap_089',
   domain: "Domain 1: Design Solutions for Organizational Complexity",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A global media conglomerate operates 50 streaming services, 100 news websites, and 500 mobile apps across 150 AWS accounts. The CEO mandates: unified customer identity across all properties, personalized content recommendations using viewing history from all services, GDPR/CCPA compliance with data deletion across all systems, centralized content moderation, and reduced authentication costs by 60%.",
   question: "Which architecture BEST provides unified identity and personalization at scale?",
   options: [
       "Amazon Cognito with user pools federation across all services for unified identity, Amazon Personalize with multi-tenant event tracking for cross-service recommendations, AWS Lake Formation with governed tables for GDPR/CCPA data lineage and deletion, Amazon Rekognition Content Moderation with centralized workflow, AWS Organizations consolidated billing revealing Cognito MAU optimization opportunities, and Amazon DataZone for privacy-compliant data sharing",
       "Build custom identity service on DynamoDB, implement Redis for session management, use SageMaker for recommendations, manual GDPR compliance, separate moderation per service, and traditional cost tracking",
       "Active Directory federation for identity, third-party personalization service, data warehouse for unified view, outsourced moderation, SAML for authentication, and manual cost analysis",
       "Okta for identity management, custom ML on EC2, S3 data lake with Glue, AI-based moderation, OAuth everywhere, and FinOps team for costs"
   ],
   correct: 0,
   explanation: {
       correct: "Cognito federation provides unified identity with built-in GDPR/CCPA features and scales to millions at low cost, Personalize with multi-tenant architecture enables cross-service recommendations while maintaining data isolation, Lake Formation governed tables track data lineage enabling compliant deletion across all systems, centralized Rekognition moderation ensures consistent standards, consolidated billing reveals per-service MAU enabling targeted optimization for 60% reduction, and DataZone enables secure data sharing for personalization while maintaining privacy compliance.",
       whyWrong: {
           1: "Custom identity service requires massive development and compliance effort, and manual GDPR across 150 accounts is error-prone",
           2: "AD doesn't scale well for consumer identity, and third-party services add cost without AWS integration benefits",
           3: "Okta is expensive at scale for consumer use cases, and custom ML lacks the managed features of Personalize"
       },
       examStrategy: "For consumer identity at scale: Cognito with federation. Personalize supports multi-tenant architectures. Lake Formation governed tables enable compliance. DataZone provides governed data sharing."
   }
},
{
   id: 'sap_090',
   domain: "Domain 2: Design for New Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A renewable energy company is building a smart grid platform managing 100,000 solar installations, 50,000 battery systems, and 10,000 wind turbines. Requirements: real-time energy trading with <100ms execution, predict energy generation 48 hours ahead using weather data, optimize battery charging/discharging across the grid, detect equipment failures before they occur, integrate with 20 different utility companies' systems, and operate during internet outages.",
   question: "Which architecture BEST enables intelligent distributed energy management?",
   options: [
       "AWS IoT SiteWise Edge for distributed energy asset monitoring with local buffering, Amazon Forecast with Weather Index for 48-hour generation prediction, AWS IoT Analytics for grid optimization algorithms, Amazon Monitron for predictive maintenance on equipment, AWS B2B Data Interchange for utility company EDI integration, Amazon MemoryDB for real-time trading with <100ms latency, and AWS IoT Greengrass for autonomous edge operation during outages",
       "IoT Core for all devices, Kinesis for streaming, SageMaker for all ML, DynamoDB for trading, Lambda for optimization, API Gateway for integrations, and Direct Connect for reliability",
       "EC2 for device management, MSK for event streaming, custom weather prediction, RDS for data storage, Step Functions for workflows, REST APIs for utilities, and backup generators",
       "Timestream for telemetry, Batch for predictions, ElastiCache for trading, Glue for ETL, EventBridge for automation, AppSync for APIs, and redundant internet connections"
   ],
   correct: 0,
   explanation: {
       correct: "IoT SiteWise Edge provides industrial-grade monitoring with buffering for 100,000+ assets, Forecast with Weather Index leverages built-in weather data for accurate generation prediction, IoT Analytics enables complex grid optimization across battery systems, Monitron provides purpose-built predictive maintenance for energy equipment, B2B Data Interchange handles various utility EDI standards and protocols, MemoryDB delivers consistent <100ms trading with durability, and Greengrass enables autonomous operation during outages maintaining grid stability.",
       whyWrong: {
           1: "Generic IoT Core lacks industrial features for energy assets, and Lambda has cold start issues for real-time trading",
           2: "EC2-based management doesn't scale for 160,000 distributed assets, and custom weather prediction lacks Forecast's integrated data",
           3: "Timestream alone doesn't provide asset modeling, and redundant internet doesn't enable true offline operation"
       },
       examStrategy: "For smart grid/energy: IoT SiteWise Edge for industrial IoT, Forecast Weather Index for energy prediction, Monitron for predictive maintenance, B2B Data Interchange for utility integration."
   }
},

// Continuing questions 91-100...
{
   id: 'sap_091',
   domain: "Domain 3: Continuous Improvement for Existing Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A global e-commerce platform with 100M products runs on: 1000 m5.4xlarge EC2 instances, Elasticsearch cluster with 50 i3.8xlarge nodes for search, PostgreSQL RDS for inventory, Redis for cart sessions, and CloudFront. Problems: Elasticsearch costs $300K/month, search latency is 2 seconds, 30% of EC2 capacity unused overnight, cart abandonment due to session loss, and Black Friday scaling takes 30 minutes causing outages.",
   question: "Which optimization strategy provides the BEST cost reduction and performance improvement?",
   options: [
       "Migrate to Amazon OpenSearch Serverless for automatic scaling and 40% cost reduction, implement OpenSearch's Learning to Rank for ML-powered search relevance, use EC2 Auto Scaling with predictive scaling for Black Friday, replace Redis with Amazon MemoryDB for durable cart sessions, implement CloudFront Origin Shield to reduce backend load 85%, and Compute Savings Plans for baseline capacity",
       "Keep Elasticsearch but use Spot instances, add more cache layers, scale EC2 manually before events, use DynamoDB for carts, increase CloudFront TTLs, and negotiate Enterprise Agreement",
       "Move search to RDS full-text, implement application caching, use Reserved Instances, add Redis replicas, pre-scale for Black Friday, and use multiple CDNs",
       "Migrate to Solr on EC2, implement Varnish cache, use t3 instances with unlimited, store carts in PostgreSQL, add more CloudFront behaviors, and implement auto-scaling"
   ],
   correct: 0,
   explanation: {
       correct: "OpenSearch Serverless eliminates cluster management and reduces costs 40% through automatic scaling, Learning to Rank improves search relevance reducing query complexity and latency to <500ms, predictive scaling anticipates Black Friday patterns enabling proactive scaling, MemoryDB provides Redis-compatible performance with Multi-AZ durability preventing cart loss, Origin Shield reduces origin requests 85% cutting transfer costs and backend load, and Savings Plans optimize baseline costs by 27%.",
       whyWrong: {
           1: "Spot instances for search infrastructure risk availability, and manual scaling doesn't address 30-minute delay",
           2: "RDS full-text search can't handle 100M products efficiently, and pre-scaling wastes money for weeks",
           3: "Solr requires more management than OpenSearch, and t3 instances aren't suitable for consistent e-commerce workloads"
       },
       examStrategy: "OpenSearch Serverless provides managed Elasticsearch with automatic scaling. Learning to Rank is key for search relevance. MemoryDB provides durable Redis. Origin Shield dramatically reduces origin load."
   }
},
{
   id: 'sap_092',
   domain: "Domain 4: Accelerate Workload Migration and Modernization",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A national postal service is migrating its logistics platform from on-premises to AWS. The system includes: Oracle RAC databases with 50TB of package tracking data, real-time integration with 100,000 handheld scanners, mainframe CICS applications for routing, SAP for finance, custom GIS system for route optimization, and 500 distribution centers with local servers. Migration must maintain 24/7 operations and integrate with international postal systems.",
   question: "Which migration approach ensures zero disruption to mail delivery operations?",
   options: [
       "AWS DMS with CDC for zero-downtime Oracle RAC migration to Amazon RDS Custom for Oracle, AWS IoT Core with Device Management for scanner fleet, AWS Mainframe Modernization with dual-run for CICS, SAP on AWS with HANA migration, Amazon Location Service replacing custom GIS, AWS Outposts for distribution centers maintaining local processing, and AWS B2B Data Interchange for international postal integration",
       "Lift-and-shift Oracle to EC2, build new scanner system, rewrite mainframe applications, keep SAP on-premises, maintain existing GIS, use Direct Connect to distribution centers, and custom APIs for integration",
       "Migrate to Aurora PostgreSQL, implement new IoT platform, containerize mainframe apps, move SAP to cloud, rebuild GIS on Lambda, centralize all processing, and use VPN for connectivity",
       "Use Oracle Cloud for databases, third-party MDM for scanners, keep mainframe as-is, hybrid SAP deployment, Google Maps for routing, edge servers at locations, and EDI for postal systems"
   ],
   correct: 0,
   explanation: {
       correct: "DMS with CDC ensures zero-downtime migration critical for 24/7 operations, RDS Custom maintains Oracle RAC features required for package tracking, IoT Core with Device Management handles 100,000 scanners at scale, dual-run Mainframe Modernization ensures routing continuity, SAP on AWS with automated HANA migration preserves finance operations, Location Service provides managed GIS with routing APIs, Outposts maintains local processing for distribution centers during network outages, and B2B Data Interchange handles various international postal EDI standards.",
       whyWrong: {
           1: "Lift-and-shift doesn't modernize for cloud benefits, and building new scanner system during operations risks package tracking",
           2: "Aurora PostgreSQL requires significant Oracle conversion affecting 24/7 operations, and centralizing removes local resilience",
           3: "Multi-cloud approach adds complexity, and keeping mainframe prevents modernization benefits"
       },
       examStrategy: "For zero-downtime migrations: DMS with CDC is essential. RDS Custom preserves Oracle RAC features. Location Service is AWS's GIS solution. B2B Data Interchange handles EDI standards."
   }
},
{
   id: 'sap_093',
   domain: "Domain 1: Design Solutions for Organizational Complexity",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A global investment bank with 300 AWS accounts needs to implement: complete network isolation between trading desks for regulatory compliance, centralized egress filtering for data loss prevention, low-latency connectivity between accounts (<1ms), support for overlapping IP ranges from acquisitions, centralized DNS resolution with query logging, and network costs optimization (currently $2M/month).",
   question: "Which network architecture BEST meets these complex requirements?",
   options: [
       "AWS Transit Gateway with multiple route tables for isolation, AWS Network Firewall in centralized egress VPC for DLP, Transit Gateway peering for inter-region connectivity, AWS Cloud WAN for overlapping IP support with NAT, Route 53 Resolver with query logging in shared services VPC, and replace NAT Gateways with NAT instances in smaller accounts for cost optimization",
       "VPC peering mesh between all accounts, Security Groups for isolation, NAT Gateways in each VPC, VPN for overlapping IPs, Route 53 private hosted zones, and Direct Connect for all traffic",
       "AWS PrivateLink for everything, distributed firewalls, Direct Connect with VIFs, proxy servers for overlapping IPs, centralized DNS servers on EC2, and internet gateway in each VPC",
       "Hub-and-spoke with Transit VPC, virtual firewalls on EC2, software-defined WAN, NAT for overlapping ranges, BIND DNS servers, and centralized internet egress"
   ],
   correct: 0,
   explanation: {
       correct: "Transit Gateway with route tables provides scalable isolation without managing thousands of peering connections, Network Firewall in egress VPC enables centralized DLP and reduces costs vs distributed firewalls, Transit Gateway peering maintains <1ms latency, Cloud WAN elegantly handles overlapping IPs with built-in NAT, Route 53 Resolver with logging provides managed DNS with compliance logging, and NAT instances in small accounts can reduce costs 75% vs NAT Gateways for $500K+ annual savings.",
       whyWrong: {
           1: "VPC peering mesh with 300 accounts is unmanageable (44,850 connections), and NAT Gateways everywhere is expensive",
           2: "PrivateLink doesn't support all use cases, and distributed firewalls multiply costs significantly",
           3: "Transit VPC is outdated pattern, and managing BIND DNS servers adds operational overhead"
       },
       examStrategy: "For complex enterprise networking: Transit Gateway with route tables for isolation, Cloud WAN for overlapping IPs, Network Firewall for centralized security. NAT instances can still be cost-effective for small workloads."
   }
},
{
   id: 'sap_094',
   domain: "Domain 2: Design for New Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A biotech company is building a drug discovery platform using AI/ML. Requirements: process 10 million molecular structures daily, run quantum chemistry simulations requiring 1000 GPUs for 48-hour jobs, store 500TB of genomic data with HIPAA compliance, enable collaboration between 50 research institutions, provide real-time visualization of 3D protein folding, support FDA submission with 21 CFR Part 11 compliance, and reduce time-to-discovery by 10x.",
   question: "Which architecture BEST accelerates drug discovery while maintaining compliance?",
   options: [
       "AWS ParallelCluster with P4d instances for GPU compute at scale, Amazon EC2 Hpc6a instances for quantum simulations, AWS HealthLake for HIPAA-compliant genomic storage with FHIR APIs, AWS Clean Rooms for multi-institution collaboration without data sharing, NICE DCV for high-performance 3D visualization, AWS Backup with compliance mode for 21 CFR Part 11, and SageMaker with distributed training for 10x acceleration",
       "EC2 Spot Fleet for GPU compute, S3 for all storage, DataSync for collaboration, Lambda for processing, QuickSight for visualization, CloudTrail for compliance, and EMR for distributed computing",
       "Batch with GPU jobs, DynamoDB for molecular data, Transfer Family for sharing, Fargate for simulations, AppStream for visualization, Config for compliance, and Glue for ETL",
       "ECS with GPU containers, RDS for structured data, Direct Connect to institutions, Step Functions for workflows, WorkSpaces for visualization, Macie for compliance, and Redshift for analytics"
   ],
   correct: 0,
   explanation: {
       correct: "ParallelCluster with P4d provides massive GPU scale with HPC scheduling for molecular processing, Hpc6a instances deliver 200 Gbps networking required for quantum simulations, HealthLake ensures HIPAA compliance with built-in de-identification and FHIR standards, Clean Rooms enables secure multi-party computation preserving research IP, NICE DCV provides GPU-accelerated remote visualization for complex 3D proteins, Backup compliance mode ensures immutable audit trails for FDA 21 CFR Part 11, and SageMaker distributed training achieves 10x speedup through optimized parallelization.",
       whyWrong: {
           1: "Spot Fleet interruptions disrupt 48-hour simulations, and S3 alone doesn't provide HIPAA-specific features",
           2: "Batch lacks HPC features for tightly-coupled GPU workloads, and DynamoDB isn't suitable for complex molecular structures",
           3: "ECS doesn't provide HPC scheduling, and WorkSpaces isn't optimized for scientific 3D visualization"
       },
       examStrategy: "For HPC drug discovery: ParallelCluster for compute orchestration, Hpc6a for network-intensive workloads, HealthLake for genomic compliance, Clean Rooms for secure collaboration."
   }
},
{
   id: 'sap_095',
   domain: "Domain 3: Continuous Improvement for Existing Solutions",
   difficulty: "medium",
   timeRecommendation: 150,
   scenario: "A mobile gaming company with 50 million users runs entirely on AWS Lambda and DynamoDB. Monthly costs are $800,000 with: 60% from Lambda invocations, 30% from DynamoDB, and 10% from data transfer. Analysis shows: 70% of Lambda invocations are for session validation, average function duration is 50ms but billed for 100ms minimum, DynamoDB has 1000 provisioned WCU/RCU per table but uses only 300 average, and 5TB of Lambda ephemeral storage downloads daily.",
   question: "Which optimization strategy would provide the MOST significant cost reduction?",
   options: [
       "Implement Amazon Cognito for session management eliminating 70% of Lambda invocations, configure Lambda with ARM-based Graviton2 for 20% cost reduction, switch DynamoDB to on-demand mode for variable workloads, implement Lambda SnapStart to reduce cold starts and duration, and use Amazon EFS for shared storage eliminating repeated downloads",
       "Add API Gateway caching, use smaller Lambda memory settings, keep DynamoDB provisioned but lower values, implement CloudFront, and compress all payloads",
       "Move session validation to EC2, batch Lambda invocations, use DynamoDB auto-scaling, add ElastiCache, and optimize code",
       "Implement Step Functions, use Lambda layers, add DynamoDB global tables, implement X-Ray, and use Reserved Capacity"
   ],
   correct: 0,
   explanation: {
       correct: "Cognito eliminates 70% of Lambda invocations providing massive cost reduction on the largest cost driver, Graviton2 provides 20% better price-performance, on-demand DynamoDB better matches the 300 average vs 1000 provisioned capacity, SnapStart reduces Java/Python cold starts improving duration efficiency, and EFS eliminates 5TB daily downloads saving significant data transfer costs.",
       whyWrong: {
           1: "API Gateway caching helps but doesn't eliminate the root cause of excessive session validation invocations",
           2: "Moving to EC2 breaks the serverless architecture and adds management overhead",
           3: "Step Functions would increase costs for simple session validation, and Reserved Capacity doesn't exist for Lambda"
       },
       examStrategy: "For serverless optimization: Cognito eliminates auth Lambda invocations, Graviton2 reduces compute costs, SnapStart improves cold starts. Address the root cause not symptoms."
   }
},
{
   id: 'sap_096',
   domain: "Domain 4: Accelerate Workload Migration and Modernization",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A century-old railroad company is modernizing its operations to AWS. Systems include: mainframe-based train scheduling and signaling, real-time GPS tracking for 10,000 locomotives, predictive maintenance using sensor data, passenger ticketing systems, freight logistics platform, and integration with government transportation systems. The platform must ensure safety-critical operations with zero downtime and enable new digital services.",
   question: "Which modernization approach BEST balances safety-critical requirements with innovation?",
   options: [
       "AWS Mainframe Modernization with dual-run for train control systems ensuring safety, AWS IoT FleetWise for locomotive tracking with railway-specific protocols, Amazon Monitron and Lookout for Equipment for predictive maintenance, modern ticketing on Amazon API Gateway with Cognito, AWS Supply Chain for freight logistics optimization, AWS B2B Data Interchange for government system integration, and AWS Outposts at critical signal locations for local resilience",
       "Keep mainframe for safety systems, build new IoT platform, use SageMaker for all ML, create custom ticketing system, build logistics from scratch, use APIs for integration, and hybrid cloud approach",
       "Full cloud migration of everything, serverless architecture, AI for all operations, mobile-first design, blockchain for logistics, microservices everywhere, and public cloud only",
       "Lift-and-shift mainframe to EC2, basic GPS tracking, manual maintenance, keep existing ticketing, separate logistics system, point-to-point integrations, and VPN connectivity"
   ],
   correct: 0,
   explanation: {
       correct: "Dual-run Mainframe Modernization maintains safety-critical signaling while enabling gradual modernization, IoT FleetWise handles railway-specific protocols (like Positive Train Control), Monitron and Lookout provide purpose-built predictive maintenance for industrial equipment, API Gateway with Cognito enables modern digital ticketing experiences, AWS Supply Chain provides end-to-end freight visibility and optimization, B2B Data Interchange handles government EDI requirements, and Outposts at signal locations ensures operations during network failures.",
       whyWrong: {
           1: "Keeping mainframe limits innovation potential, and building custom everything delays time-to-value",
           2: "Full serverless for safety-critical train control is irresponsible, and blockchain adds unnecessary complexity",
           3: "Lift-and-shift doesn't modernize capabilities, and basic GPS lacks railway-specific features"
       },
       examStrategy: "For safety-critical modernization: dual-run approach maintains safety while modernizing. IoT FleetWise supports industry protocols. Monitron/Lookout are purpose-built for industrial predictive maintenance."
   }
},
{
   id: 'sap_097',
   domain: "Domain 1: Design Solutions for Organizational Complexity",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A global law firm with 10,000 attorneys across 50 offices needs to implement: matter-centric security (each legal case has unique access requirements), compliant e-discovery across 100TB of documents, secure collaboration with external counsel and clients, AI-powered legal research while maintaining attorney-client privilege, billing integration with 200 client systems, and compliance with legal industry regulations (CCPA, GDPR, data residency).",
   question: "Which architecture BEST addresses legal industry security and compliance requirements?",
   options: [
       "Amazon WorkDocs with SDK for matter-based access controls, Amazon Kendra with access control lists for privileged legal research, AWS Clean Rooms for secure external collaboration without data exposure, Amazon Textract with Amazon Comprehend Legal for e-discovery processing, AWS B2B Data Interchange for client billing system integration, AWS Control Tower with data residency guardrails per jurisdiction, and Amazon Macie for privilege detection",
       "SharePoint on AWS for documents, Elasticsearch for research, S3 with bucket policies for sharing, Lambda for document processing, custom billing APIs, Organizations for compliance, and CloudTrail for audit",
       "Box.com integration for documents, third-party legal research, email for collaboration, manual e-discovery, point-to-point billing integration, manual compliance tracking, and basic logging",
       "EFS for file storage, OpenSearch for search, IAM roles for access, Textract for OCR, REST APIs for billing, Config for compliance, and CloudWatch for monitoring"
   ],
   correct: 0,
   explanation: {
       correct: "WorkDocs SDK enables programmatic matter-centric access beyond simple folder permissions, Kendra with ACLs maintains privilege during AI-powered research, Clean Rooms allows secure collaboration without exposing client data, Textract with Comprehend Legal extracts and understands legal documents for e-discovery, B2B Data Interchange handles various client billing formats (EDI, API, file), Control Tower guardrails enforce data residency automatically, and Macie identifies and protects privileged communications.",
       whyWrong: {
           1: "SharePoint lacks matter-centric security model, and bucket policies can't handle complex legal access patterns",
           2: "Third-party solutions lack AWS integration for compliance, and manual e-discovery doesn't scale to 100TB",
           3: "EFS lacks document management features, and IAM roles alone can't implement matter-based security"
       },
       examStrategy: "For legal industry: WorkDocs provides document management with SDK, Kendra maintains access controls for search, Clean Rooms enables secure collaboration, Comprehend has legal-specific features."
   }
},
{
   id: 'sap_098',
   domain: "Domain 2: Design for New Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "An autonomous shipping company is building a fleet management platform for 1,000 autonomous cargo ships. Requirements: real-time navigation processing with satellite and radar data, weather routing optimization across ocean routes, collision avoidance with ML prediction, remote vessel control with <2 second latency anywhere at sea, predictive maintenance for engines and systems, compliance with maritime regulations (IMO 2020), and integration with 500 ports worldwide.",
   question: "Which architecture BEST enables autonomous maritime operations globally?",
   options: [
       "AWS Ground Station for satellite communication with ships, AWS IoT FleetWise with maritime protocols (NMEA), Amazon Location Service with maritime charts for navigation, Amazon Forecast with Weather Index for route optimization, SageMaker reinforcement learning for collision avoidance, AWS Wavelength with maritime carriers for low-latency control, Amazon Lookout for Equipment for predictive maintenance, and AWS B2B Data Interchange for port system integration",
       "Direct satellite links, generic IoT platform, Google Maps for navigation, basic weather APIs, simple ML models, standard internet for control, threshold-based maintenance, and custom port APIs",
       "Inmarsat only, custom IoT solution, offline navigation, weather downloads, rule-based avoidance, VPN for control, scheduled maintenance, and EDI for ports",
       "Multiple satellite providers, Azure IoT, HERE maps, weather.com API, TensorFlow models, 5G for control, manual maintenance tracking, and point-to-point integration"
   ],
   correct: 0,
   explanation: {
       correct: "Ground Station provides global satellite coverage for continuous ship communication, IoT FleetWise supports maritime NMEA protocols and ship systems, Location Service with maritime charts ensures accurate ocean navigation, Forecast with Weather Index optimizes routing using integrated weather data, SageMaker RL adapts collision avoidance to changing conditions, Wavelength with maritime carriers achieves <2 second control latency at sea, Lookout for Equipment predicts failures in marine engines, and B2B Data Interchange handles diverse port EDI standards globally.",
       whyWrong: {
           1: "Google Maps lacks maritime navigation features, and standard internet doesn't work reliably at sea",
           2: "Offline navigation prevents real-time optimization, and scheduled maintenance misses failure predictions",
           3: "Multi-cloud adds complexity for ships at sea, and HERE maps lacks maritime-specific features"
       },
       examStrategy: "For maritime/shipping: Ground Station provides satellite connectivity, Location Service supports maritime navigation, Wavelength enables edge computing with carriers, IoT FleetWise handles industry protocols."
   }
},
{
   id: 'sap_099',
   domain: "Domain 3: Continuous Improvement for Existing Solutions",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A video streaming platform with 200M users spends $5M monthly on AWS. Architecture: CloudFront ($2M), EC2 for transcoding ($1.5M), S3 for videos ($1M), RDS for metadata ($500K). Issues: CloudFront cache hit ratio is 60%, transcoding takes 4x video duration, S3 has 100PB with 90% never accessed, RDS has complex queries causing timeouts, and new 8K content doubles infrastructure costs.",
   question: "Which optimization strategy achieves the MOST comprehensive cost reduction and performance improvement?",
   options: [
       "Implement CloudFront Origin Shield and Cache-Control headers to increase hit ratio to 95%, replace EC2 transcoding with AWS Elemental MediaConvert for parallel processing, enable S3 Intelligent-Tiering moving 90PB to Archive tiers, migrate RDS to Amazon Neptune for graph-based content relationships, implement AWS Elemental MediaPackage for just-in-time packaging reducing storage 40%, and use CloudFront compression for 8K content",
       "Add more CloudFront edges, use larger EC2 instances, manually move old videos to Glacier, add RDS read replicas, pre-transcode everything, and increase bandwidth",
       "Use multiple CDNs, build custom transcoding on GPUs, implement tape storage for old content, move to NoSQL, create more formats, and compress everything",
       "Reduce video quality, limit transcoding, delete old content, simplify database, charge users more, and block 8K content"
   ],
   correct: 0,
   explanation: {
       correct: "Origin Shield and proper cache headers achieve 95% hit ratio reducing origin costs 80%, MediaConvert provides managed parallel transcoding 10x faster than serial EC2, Intelligent-Tiering automatically moves 90PB to Archive saving $800K/month, Neptune's graph model perfectly fits content relationships eliminating query timeouts, MediaPackage just-in-time packaging eliminates storing multiple formats reducing storage 40%, and CloudFront compression reduces 8K bandwidth costs 30%.",
       whyWrong: {
           1: "Adding infrastructure without optimization increases costs further, and pre-transcoding wastes storage",
           2: "Multiple CDNs add complexity, and tape storage prevents streaming access to archived content",
           3: "Reducing quality and limiting features degrades user experience and competitive position"
       },
       examStrategy: "For video platform optimization: Origin Shield is crucial for CDN costs, MediaConvert beats EC2 for transcoding, MediaPackage enables just-in-time packaging, Neptune excels at content relationships."
   }
},
{
   id: 'sap_100',
   domain: "Domain 4: Accelerate Workload Migration and Modernization",
   difficulty: "hard",
   timeRecommendation: 180,
   scenario: "A 150-year-old national bank must migrate its entire technology stack to AWS within 24 months due to regulatory mandate. This includes: core banking on IBM mainframe (10M transactions/day), 500 branch applications, 50M customer accounts, credit card processing platform, mobile banking serving 30M users, data warehouse with 20 years history (5PB), and real-time fraud detection. Requirements: zero customer impact, maintain all regulatory reporting, achieve PCI-DSS and SOC2 compliance, and enable open banking APIs.",
   question: "Which migration strategy ensures regulatory compliance while meeting the aggressive timeline?",
   options: [
       "AWS Migration Hub Orchestra for program management, AWS Mainframe Modernization with blue-green deployment for core banking, AWS Application Migration Service wave-based migration for branch applications, AWS DataSync with DMS for account migration with validation, AWS Data Pipeline for warehouse migration to Redshift, Amazon Fraud Detector replacing existing system, AWS Control Tower with Financial Services Industry Lens for compliance, and API Gateway with Lambda authorizers for open banking",
       "Big bang migration over a weekend, lift-and-shift everything to EC2, keep all databases as-is, maintain existing fraud system, basic AWS setup, manual compliance checks, and REST APIs for open banking",
       "Gradual migration over 5 years, hybrid cloud permanently, keep mainframe running, selective application migration, partial data migration, maintain on-premises fraud detection, and delay open banking",
       "Outsource to system integrator, rewrite everything from scratch, move to microservices, implement blockchain, go cloud-native, build new fraud system, and create API marketplace"
   ],
   correct: 0,
   explanation: {
       correct: "Migration Hub Orchestra coordinates complex program meeting 24-month deadline, Mainframe Modernization with blue-green ensures zero customer impact during core banking migration, wave-based MGN systematically migrates 500 branch apps, DataSync with DMS handles massive data migration with validation ensuring account integrity, Data Pipeline efficiently migrates 5PB warehouse to Redshift, Fraud Detector provides superior ML-based detection, Control Tower with FSI Lens ensures PCI-DSS/SOC2 compliance from day one, and API Gateway with Lambda authorizers enables secure open banking APIs.",
       whyWrong: {
           1: "Big bang migration of a 150-year-old bank is impossibly risky and would cause massive customer impact",
           2: "5-year gradual migration exceeds regulatory mandate, and permanent hybrid increases costs and complexity",
           3: "Complete rewrite in 24 months is impossible for core banking, and blockchain is unnecessary complexity"
       },
       examStrategy: "For large-scale regulated migrations: Migration Hub Orchestra coordinates complexity, wave-based approach manages risk, blue-green deployment ensures zero downtime, FSI Lens provides compliance blueprints."
   }
}

];

// Randomize answer positions to fix the problem where correct answer is always position 0
function randomizeQuestionBankAnswers(questions) {
    return questions.map(question => {
        // Skip if already randomized or has multiple correct answers
        if (question.correct !== 0 || Array.isArray(question.correct)) {
            return question;
        }
        
        // Create array of indices [0, 1, 2, 3]
        const indices = Array.from({length: question.options.length}, (_, i) => i);
        
        // Shuffle indices
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        
        // Reorder options based on shuffled indices
        const newOptions = indices.map(i => question.options[i]);
        
        // Find where the correct answer moved to
        const newCorrectIndex = indices.indexOf(0);
        
        // Update explanation's whyWrong indices if it exists
        let newExplanation = {...question.explanation};
        if (newExplanation.whyWrong) {
            const newWhyWrong = {};
            Object.entries(newExplanation.whyWrong).forEach(([key, value]) => {
                const oldIndex = parseInt(key);
                const newIndex = indices.indexOf(oldIndex);
                if (newIndex !== newCorrectIndex) {
                    newWhyWrong[newIndex] = value;
                }
            });
            newExplanation.whyWrong = newWhyWrong;
        }
        
        return {
            ...question,
            options: newOptions,
            correct: newCorrectIndex,
            explanation: newExplanation
        };
    });
}

// Apply the randomization to fix all questions
window.questionBank = randomizeQuestionBankAnswers(window.questionBank);

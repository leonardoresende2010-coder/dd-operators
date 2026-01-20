export const translations = {
    'pt-BR': {
        // Header
        header: {
            title: 'Due Diligence',
            questionnaire: 'Questionário',
            admin: 'Admin',
            logout: 'Sair'
        },
        // Login
        login: {
            title: 'Due Diligence',
            subtitle: 'Acesse o sistema',
            email: 'Email',
            password: 'Senha',
            enter: 'Entrar',
            loading: 'Carregando...',
            adminNote: 'Operadores são cadastrados pelo administrador'
        },
        // Admin Dashboard
        admin: {
            title: 'Dashboard Administrativo',
            subtitle: 'Gerencie operadores e visualize status',
            newOperator: 'Novo Operador',
            exportCSV: 'Exportar CSV',
            operators: 'Operadores',
            finalized: 'Finalizados',
            inProgress: 'Em Andamento',
            alerts: 'Alertas',
            company: 'Empresa',
            email: 'Email',
            status: 'Status',
            progress: 'Progresso',
            actions: 'Ações',
            view: 'Ver',
            active: 'ativo',
            inactive: 'inativo',
            noOperators: 'Nenhum operador',
            details: 'Detalhes',
            submitted: 'Enviado',
            answers: 'Respostas do Questionário',
            filesUploaded: 'Arquivos Enviados',
            createOperator: 'Novo Operador',
            companyName: 'Nome da Empresa',
            password: 'Senha',
            passwordHint: 'A senha será enviada ao operador',
            cancel: 'Cancelar',
            create: 'Criar Operador',
            creating: 'Criando...',
            notStarted: 'Não iniciado'
        },
        // Questionnaire
        questionnaire: {
            title: 'Questionário Due Diligence',
            subtitle: 'Preencha as informações de compliance da sua empresa',
            step: 'Etapa',
            of: 'de',
            previous: 'Anterior',
            next: 'Próximo',
            saving: 'Salvando...',
            finalize: 'Finalizar',
            reopen: 'Reabrir',
            sent: 'Enviado em',
            successSaved: 'Salvo com sucesso!',
            successFinalized: 'Questionário finalizado!',
            errorSave: 'Erro ao salvar',
            errorLoad: 'Erro ao carregar',
            errorFinalize: 'Erro ao finalizar'
        },
        // Steps titles
        steps: {
            governance: 'Governança',
            security: 'Segurança',
            lifecycle: 'Ciclo de Vida',
            incidents: 'Incidentes',
            development: 'SDLC & IA',
            hr: 'RH & Auditoria',
            integrity: 'Integridade',
            upload: 'Arquivos'
        },
        // Step 1 - Governance
        step1: {
            title: 'Governança & Regulatório',
            country: 'País sede da empresa',
            selectCountry: 'Selecione o país',
            licenses: 'Licenças regulatórias',
            licensesPlaceholder: 'Ex: CVM, BACEN, Loteria estadual...',
            hasDpo: 'A empresa possui DPO designado?',
            yes: 'Sim',
            no: 'Não',
            dpoName: 'Nome do DPO',
            dpoEmail: 'Email do DPO',
            policies: 'Possui políticas de privacidade documentadas?',
            policyAcceptance: 'Possui termo de aceite de política?'
        },
        // Step 2 - Security
        step2: {
            title: 'Segurança da Informação',
            certifications: 'Certificações de segurança',
            certificationsPlaceholder: 'Ex: ISO 27001, SOC 2, PCI-DSS...',
            encryption: 'Criptografia de dados em repouso',
            encryptionTransit: 'Criptografia em trânsito (TLS/SSL)',
            mfa: 'Autenticação multifator (MFA) implementada',
            firewall: 'Firewall e IDS/IPS configurados',
            pentest: 'Realiza testes de penetração periodicamente',
            pentestFrequency: 'Frequência dos testes de penetração',
            selectFrequency: 'Selecione a frequência',
            monthly: 'Mensal',
            quarterly: 'Trimestral',
            semiannual: 'Semestral',
            annual: 'Anual',
            accessControl: 'Controle de acesso baseado em funções (RBAC)'
        },
        // Step 3 - Lifecycle
        step3: {
            title: 'Ciclo de Vida dos Dados',
            retention: 'Período de retenção de dados',
            selectRetention: 'Selecione o período',
            oneYear: '1 ano',
            threeYears: '3 anos',
            fiveYears: '5 anos',
            tenYears: '10 anos',
            indefinite: 'Indefinido',
            variable: 'Variável',
            disposal: 'Processo documentado para descarte?',
            disposalMethod: 'Método de descarte',
            selectMethod: 'Selecione o método',
            physicalDestruction: 'Destruição física',
            secureErasure: 'Apagamento seguro',
            degaussing: 'Degaussing',
            encryption: 'Criptografia',
            compliance: 'Conformidade com regulamentação local de privacidade de dados pessoais',
            yes: 'Sim',
            no: 'Não',
            partial: 'Parcial'
        },
        // Step 4 - Incidents
        step4: {
            title: 'Resposta a Incidentes',
            plan: 'Plano de resposta a incidentes documentado?',
            notificationTime: 'Tempo de notificação ao titular (horas)',
            rto: 'RTO - Recovery Time Objective (horas)',
            rpo: 'RPO - Recovery Point Objective (horas)',
            csirt: 'Possui equipe de resposta a incidentes?',
            insurance: 'Possui seguro cyber?',
            yes: 'Sim',
            no: 'Não'
        },
        // Step 5 - Development
        step5: {
            title: 'Desenvolvimento Seguro & IA',
            sdlc: 'Possui SDLC (Secure Development Lifecycle)?',
            codeReview: 'Realiza revisão de código?',
            sast: 'Utiliza ferramentas SAST/DAST?',
            ai: 'Utiliza sistemas de IA?',
            aiGovernance: 'Possui governança de IA documentada?',
            aiDataProtection: 'IA processa dados pessoais?',
            yes: 'Sim',
            no: 'Não'
        },
        // Step 6 - HR
        step6: {
            title: 'RH & Treinamento',
            backgroundCheck: 'Realiza background check de funcionários?',
            securityTraining: 'Programa de treinamento em segurança?',
            trainingFrequency: 'Frequência do treinamento',
            selectFrequency: 'Selecione a frequência',
            monthly: 'Mensal',
            quarterly: 'Trimestral',
            semiannual: 'Semestral',
            annual: 'Anual',
            nda: 'Funcionários assinam NDA?',
            audit: 'Passa por auditoria externa?',
            auditFrequency: 'Frequência da auditoria',
            yes: 'Sim',
            no: 'Não'
        },
        // Step 7 - Integrity
        step7: {
            title: 'Integridade & Ética',
            codeOfConduct: 'Possui código de conduta?',
            whistleblower: 'Canal de denúncias implementado?',
            antiCorruption: 'Política anticorrupção documentada?',
            thirdParty: 'Due diligence de terceiros?',
            conflictOfInterest: 'Política de conflito de interesses?',
            yes: 'Sim',
            no: 'Não'
        },
        // Step 8 - Upload
        step8: {
            title: 'Documentos & Evidências',
            subtitle: 'Faça upload dos documentos comprobatórios',
            category: 'Categoria do documento',
            selectCategory: 'Selecione a categoria',
            policies: 'Políticas',
            certificates: 'Certificados',
            audits: 'Auditorias',
            contracts: 'Contratos',
            others: 'Outros',
            dragDrop: 'Arraste arquivos ou clique para selecionar',
            maxSize: 'Máximo 10MB por arquivo',
            upload: 'Enviar',
            uploading: 'Enviando...',
            uploadedFiles: 'Arquivos Enviados',
            noFiles: 'Nenhum arquivo enviado',
            delete: 'Excluir'
        },
        // Common
        common: {
            yes: 'Sim',
            no: 'Não',
            select: 'Selecione',
            loading: 'Carregando...',
            error: 'Erro',
            success: 'Sucesso',
            save: 'Salvar',
            cancel: 'Cancelar',
            confirm: 'Confirmar',
            delete: 'Excluir',
            edit: 'Editar',
            view: 'Ver',
            close: 'Fechar',
            required: 'Obrigatório'
        }
    },
    'en-US': {
        // Header
        header: {
            title: 'Due Diligence',
            questionnaire: 'Questionnaire',
            admin: 'Admin',
            logout: 'Logout'
        },
        // Login
        login: {
            title: 'Due Diligence',
            subtitle: 'Access the system',
            email: 'Email',
            password: 'Password',
            enter: 'Sign In',
            loading: 'Loading...',
            adminNote: 'Operators are registered by the administrator'
        },
        // Admin Dashboard
        admin: {
            title: 'Admin Dashboard',
            subtitle: 'Manage operators and view status',
            newOperator: 'New Operator',
            exportCSV: 'Export CSV',
            operators: 'Operators',
            finalized: 'Completed',
            inProgress: 'In Progress',
            alerts: 'Alerts',
            company: 'Company',
            email: 'Email',
            status: 'Status',
            progress: 'Progress',
            actions: 'Actions',
            view: 'View',
            active: 'active',
            inactive: 'inactive',
            noOperators: 'No operators',
            details: 'Details',
            submitted: 'Submitted',
            answers: 'Questionnaire Answers',
            filesUploaded: 'Uploaded Files',
            createOperator: 'New Operator',
            companyName: 'Company Name',
            password: 'Password',
            passwordHint: 'The password will be sent to the operator',
            cancel: 'Cancel',
            create: 'Create Operator',
            creating: 'Creating...',
            notStarted: 'Not started'
        },
        // Questionnaire
        questionnaire: {
            title: 'Due Diligence Questionnaire',
            subtitle: 'Fill in your company\'s compliance information',
            step: 'Step',
            of: 'of',
            previous: 'Previous',
            next: 'Next',
            saving: 'Saving...',
            finalize: 'Submit',
            reopen: 'Reopen',
            sent: 'Submitted on',
            successSaved: 'Saved successfully!',
            successFinalized: 'Questionnaire submitted!',
            errorSave: 'Error saving',
            errorLoad: 'Error loading',
            errorFinalize: 'Error submitting'
        },
        // Steps titles
        steps: {
            governance: 'Governance',
            security: 'Security',
            lifecycle: 'Data Lifecycle',
            incidents: 'Incidents',
            development: 'SDLC & AI',
            hr: 'HR & Audit',
            integrity: 'Integrity',
            upload: 'Files'
        },
        // Step 1 - Governance
        step1: {
            title: 'Governance & Regulatory',
            country: 'Company headquarters country',
            selectCountry: 'Select country',
            licenses: 'Regulatory licenses',
            licensesPlaceholder: 'E.g.: FCA, SEC, Gaming license...',
            hasDpo: 'Does the company have a designated DPO?',
            yes: 'Yes',
            no: 'No',
            dpoName: 'DPO Name',
            dpoEmail: 'DPO Email',
            policies: 'Has documented privacy policies?',
            policyAcceptance: 'Has policy acceptance terms?'
        },
        // Step 2 - Security
        step2: {
            title: 'Information Security',
            certifications: 'Security certifications',
            certificationsPlaceholder: 'E.g.: ISO 27001, SOC 2, PCI-DSS...',
            encryption: 'Data encryption at rest',
            encryptionTransit: 'Encryption in transit (TLS/SSL)',
            mfa: 'Multi-factor authentication (MFA) implemented',
            firewall: 'Firewall and IDS/IPS configured',
            pentest: 'Performs periodic penetration testing',
            pentestFrequency: 'Penetration testing frequency',
            selectFrequency: 'Select frequency',
            monthly: 'Monthly',
            quarterly: 'Quarterly',
            semiannual: 'Semi-annual',
            annual: 'Annual',
            accessControl: 'Role-based access control (RBAC)'
        },
        // Step 3 - Lifecycle
        step3: {
            title: 'Data Lifecycle',
            retention: 'Data retention period',
            selectRetention: 'Select period',
            oneYear: '1 year',
            threeYears: '3 years',
            fiveYears: '5 years',
            tenYears: '10 years',
            indefinite: 'Indefinite',
            variable: 'Variable',
            disposal: 'Documented disposal process?',
            disposalMethod: 'Disposal method',
            selectMethod: 'Select method',
            physicalDestruction: 'Physical destruction',
            secureErasure: 'Secure erasure',
            degaussing: 'Degaussing',
            encryption: 'Encryption',
            compliance: 'Compliance with local data privacy regulations',
            yes: 'Yes',
            no: 'No',
            partial: 'Partial'
        },
        // Step 4 - Incidents
        step4: {
            title: 'Incident Response',
            plan: 'Documented incident response plan?',
            notificationTime: 'Data subject notification time (hours)',
            rto: 'RTO - Recovery Time Objective (hours)',
            rpo: 'RPO - Recovery Point Objective (hours)',
            csirt: 'Has incident response team?',
            insurance: 'Has cyber insurance?',
            yes: 'Yes',
            no: 'No'
        },
        // Step 5 - Development
        step5: {
            title: 'Secure Development & AI',
            sdlc: 'Has SDLC (Secure Development Lifecycle)?',
            codeReview: 'Performs code review?',
            sast: 'Uses SAST/DAST tools?',
            ai: 'Uses AI systems?',
            aiGovernance: 'Has documented AI governance?',
            aiDataProtection: 'Does AI process personal data?',
            yes: 'Yes',
            no: 'No'
        },
        // Step 6 - HR
        step6: {
            title: 'HR & Training',
            backgroundCheck: 'Performs employee background checks?',
            securityTraining: 'Security training program?',
            trainingFrequency: 'Training frequency',
            selectFrequency: 'Select frequency',
            monthly: 'Monthly',
            quarterly: 'Quarterly',
            semiannual: 'Semi-annual',
            annual: 'Annual',
            nda: 'Employees sign NDA?',
            audit: 'Undergoes external audit?',
            auditFrequency: 'Audit frequency',
            yes: 'Yes',
            no: 'No'
        },
        // Step 7 - Integrity
        step7: {
            title: 'Integrity & Ethics',
            codeOfConduct: 'Has code of conduct?',
            whistleblower: 'Whistleblower channel implemented?',
            antiCorruption: 'Documented anti-corruption policy?',
            thirdParty: 'Third-party due diligence?',
            conflictOfInterest: 'Conflict of interest policy?',
            yes: 'Yes',
            no: 'No'
        },
        // Step 8 - Upload
        step8: {
            title: 'Documents & Evidence',
            subtitle: 'Upload supporting documents',
            category: 'Document category',
            selectCategory: 'Select category',
            policies: 'Policies',
            certificates: 'Certificates',
            audits: 'Audits',
            contracts: 'Contracts',
            others: 'Others',
            dragDrop: 'Drag files or click to select',
            maxSize: 'Maximum 10MB per file',
            upload: 'Upload',
            uploading: 'Uploading...',
            uploadedFiles: 'Uploaded Files',
            noFiles: 'No files uploaded',
            delete: 'Delete'
        },
        // Common
        common: {
            yes: 'Yes',
            no: 'No',
            select: 'Select',
            loading: 'Loading...',
            error: 'Error',
            success: 'Success',
            save: 'Save',
            cancel: 'Cancel',
            confirm: 'Confirm',
            delete: 'Delete',
            edit: 'Edit',
            view: 'View',
            close: 'Close',
            required: 'Required'
        }
    }
};

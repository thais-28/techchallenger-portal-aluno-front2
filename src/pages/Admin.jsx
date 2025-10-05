import React from 'react';
import Layout from '../components/Layout';
import AdminPanel from '../components/AdminPanel';

const Admin = () => {
    return (
        <Layout 
            title="Painel Administrativo"
            subtitle="Gerencie posts e conteúdo educacional"
        >
            <AdminPanel />
        </Layout>
    );
};

export default Admin;
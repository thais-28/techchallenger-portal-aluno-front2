import React, { memo } from 'react';
import { Input } from '../UI';
import styled from 'styled-components';

const SearchContainer = styled.div`
    margin: 1.5rem 0;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
`;

const PostSearch = memo(({ searchTerm, onSearch }) => (
    <SearchContainer>
        <Input
            type="text"
            placeholder="🔍 Buscar posts por título, autor ou descrição..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            helpText={searchTerm ? `Buscando por: "${searchTerm}"` : "Digite para filtrar os posts"}
        />
    </SearchContainer>
));

PostSearch.displayName = 'PostSearch';

export default PostSearch;
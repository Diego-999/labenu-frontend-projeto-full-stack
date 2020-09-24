import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import useAuthorization from "../../hooks/useAuthorization";

function CreateImagePage() {
  useAuthorization();
  return (
    <div>
      <Helmet title="Cadastre sua Imagem" />
      <h1>Página de Cadastro de Imagem</h1>
    </div>
  );
}

export default CreateImagePage;

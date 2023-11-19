# 1. OBJETO DO CONTRATO

O Proprietário concorda em alugar a propriedade localizada em $imovel.endereco.rua ("Imóvel"), na cidade de $imovel.endereco.cidade que consiste em R$ $aluguel.mensalidade para o(s) Locatário(s), com a finalidade exclusiva de uso residencial.
Locatários:
ct:repeat:begin
- Nome: $locatarios[0].nome
- Sobrenome: $locatarios[0].sobrenome
ct:repeat:end

Repetindo, caso não ficou claro:
ct:repeat:begin
- Nome: $locatarios[0].nome
- Sobrenome: $locatarios[0].sobrenome
ct:repeat:end
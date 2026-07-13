import type { Produto } from '../typings'

// Gerado por scripts/extract-framer.mjs a partir do site de referência Framer.
// Revisar manualmente contra docs/reference/screenshots/*.png antes de confiar
// cegamente nos grupos de variação — ver task-6-report.md para a lista de
// produtos com dados incertos.
export const produtos: Produto[] = [
  {
    "slug": "cantoneira-de-papelao",
    "nome": "Cantoneira de papelão",
    "categoriaId": "cantoneira",
    "badge": "Suas medidas",
    "imagens": [
      "/produtos/cantoneira-de-papelao/0.webp"
    ],
    "descricao": [
      "Cantoneira de papelão resistente desenvolvida para proteção e reforço de cantos em embalagens e cargas",
      "Ideal para paletização, amarração e proteção de produtos durante transporte e armazenamento",
      "Proporciona maior estabilidade da carga e ajuda a evitar danos causados por impactos e cintas de arquear",
      "Indicada para uso comercial, industrial e logístico",
      "Disponível em diferentes medidas, conforme necessidade do cliente."
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a onda que deseja",
        "opcoes": [
          {
            "label": "B",
            "value": "b"
          },
          {
            "label": "C",
            "value": "c"
          },
          {
            "label": "D",
            "value": "d"
          },
          {
            "label": "BB",
            "value": "bb"
          },
          {
            "label": "BC",
            "value": "bc"
          }
        ]
      }
    ]
  },
  {
    "slug": "cantoneira-de-polietileno",
    "nome": "Cantoneira de polietileno",
    "categoriaId": "cantoneira",
    "badge": "Suas medidas",
    "imagens": [
      "/produtos/cantoneira-de-polietileno/0.webp"
    ],
    "descricao": [
      "Cantoneira de polietileno desenvolvida para proteção e reforço de cantos em embalagens e cargas",
      "Ideal para paletização, amarração e proteção de produtos contra impactos e amassamentos",
      "Proporciona maior estabilidade da carga e distribuição uniforme da pressão das fitas de arquear",
      "Indicada para uso comercial, industrial e logístico",
      "Disponível em diferentes medidas e formatos, conforme necessidade do cliente."
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a opção desejada",
        "opcoes": [
          {
            "label": "Cantoneira de polietileno",
            "value": "cantoneira-de-polietileno"
          }
        ]
      }
    ]
  },
  {
    "slug": "tabuleiro",
    "nome": "Tabuleiro",
    "categoriaId": "acessorio",
    "badge": "Suas medidas",
    "imagens": [
      "/produtos/tabuleiro/0.webp"
    ],
    "descricao": [
      "Produzido em onda B",
      "Tabuleiro de papelão resistente com excelente suporte e estabilidade para diferentes aplicações",
      "Ideal para organização, separação e suporte de produtos em embalagens, transporte e exposição",
      "Indicada para uso comercial, industrial, alimentício e logístico",
      "Disponível em diferentes medidas e formatos, conforme necessidade do cliente."
    ],
    "stepper": [
      "Variação",
      "Cor",
      "Dimensões"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a onda que deseja",
        "opcoes": [
          {
            "label": "B",
            "value": "b"
          },
          {
            "label": "C",
            "value": "c"
          },
          {
            "label": "D",
            "value": "d"
          },
          {
            "label": "BB",
            "value": "bb"
          },
          {
            "label": "BC",
            "value": "bc"
          }
        ]
      },
      {
        "tipo": "swatch",
        "titulo": "Selecione a Cor",
        "opcoes": [
          {
            "label": "Pardo",
            "cor": "#e3b991"
          }
        ]
      },
      {
        "tipo": "texto",
        "titulo": "Dimensões customizadas",
        "placeholder": "Ex: 48x50x50"
      }
    ]
  },
  {
    "slug": "protecao-lateral",
    "nome": "Proteção lateral",
    "categoriaId": "acessorio",
    "badge": "Suas medidas",
    "imagens": [
      "/produtos/protecao-lateral/0.webp"
    ],
    "descricao": [
      "Produzido em onda B",
      "Proteção lateral em papelão desenvolvida para proteção e acabamento de produtos como colchões, estofados e móveis",
      "Ideal para reforçar bordas, evitar danos e garantir melhor apresentação no transporte e armazenamento",
      "Pode ser fornecida com ou sem impressão, conforme a necessidade do cliente",
      "Indicada para uso comercial, industrial e logístico."
    ],
    "stepper": [
      "Variação",
      "Cor",
      "Dimensões"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a opção desejada",
        "opcoes": [
          {
            "label": "Com impressão",
            "value": "com-impressao"
          },
          {
            "label": "Sem impressão",
            "value": "sem-impressao"
          }
        ]
      },
      {
        "tipo": "swatch",
        "titulo": "Selecione a Cor",
        "opcoes": [
          {
            "label": "Pardo",
            "cor": "#e3b991"
          }
        ]
      },
      {
        "tipo": "texto",
        "titulo": "Dimensões customizadas",
        "placeholder": "Ex: 48x50x50"
      }
    ]
  },
  {
    "slug": "palete",
    "nome": "Caixa Palete",
    "categoriaId": "caixa",
    "badge": "Suas medidas",
    "imagens": [
      "/produtos/palete/0.webp"
    ],
    "descricao": [
      "Caixa palete desenvolvida para armazenamento e transporte de grandes volumes de produtos",
      "Produção sob medida conforme as dimensões definidas pelo cliente",
      "Estrutura reforçada, projetada para suportar empilhamento e cargas mais pesadas",
      "Opção de papelão onda B, C, D, BB ou BC, conforme o nível de resistência necessário",
      "Disponível nas cores pardo ou branco",
      "Possibilidade de produção com ou sem impressão personalizada",
      "Compatível com paletização"
    ],
    "stepper": [
      "Variação",
      "Cor",
      "Impressão",
      "Dimensões"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a onda que deseja",
        "opcoes": [
          {
            "label": "B",
            "value": "b"
          },
          {
            "label": "C",
            "value": "c"
          },
          {
            "label": "D",
            "value": "d"
          },
          {
            "label": "BB",
            "value": "bb"
          },
          {
            "label": "BC",
            "value": "bc"
          }
        ]
      },
      {
        "tipo": "swatch",
        "titulo": "Escolha a cor",
        "opcoes": [
          {
            "label": "Pardo",
            "cor": "#e3b991"
          },
          {
            "label": "Branco",
            "cor": "#eeeeee"
          }
        ]
      },
      {
        "tipo": "toggle",
        "titulo": "Customização",
        "label": "Necessita de Impressão?",
        "ajuda": "Sim, com personalização de marca"
      },
      {
        "tipo": "texto",
        "titulo": "Dimensões customizadas",
        "placeholder": "Ex: 48x50x50"
      }
    ]
  },
  {
    "slug": "divisoria",
    "nome": "Divisória",
    "categoriaId": "acessorio",
    "badge": "Suas medidas",
    "imagens": [
      "/produtos/divisoria/0.webp"
    ],
    "descricao": [
      "Divisórias de papelão desenvolvidas para separação e proteção de produtos dentro de caixas e embalagens",
      "Ideal para evitar atrito, choques e movimentação de itens durante transporte e armazenamento",
      "Proporciona organização e proteção para produtos de múltiplas unidades",
      "Indicada para uso comercial, industrial, logístico e e-commerce",
      "Disponível em diferentes medidas e configurações, conforme necessidade do cliente."
    ],
    "destaque": true,
    "stepper": [
      "Variação",
      "Cor",
      "Dimensões"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a onda que deseja",
        "opcoes": [
          {
            "label": "B",
            "value": "b"
          },
          {
            "label": "C",
            "value": "c"
          },
          {
            "label": "D",
            "value": "d"
          },
          {
            "label": "BB",
            "value": "bb"
          },
          {
            "label": "BC",
            "value": "bc"
          }
        ]
      },
      {
        "tipo": "swatch",
        "titulo": "Selecione a Cor",
        "opcoes": [
          {
            "label": "Pardo",
            "cor": "#e3b991"
          }
        ]
      },
      {
        "tipo": "texto",
        "titulo": "Dimensões customizadas",
        "placeholder": "Ex: 48x50x50"
      }
    ]
  },
  {
    "slug": "arquivo-morto",
    "nome": "Caixa Arquivo morto",
    "categoriaId": "caixa",
    "badge": "Suas medidas",
    "imagens": [
      "/produtos/arquivo-morto/0.webp"
    ],
    "descricao": [
      "Caixa arquivo morto desenvolvida para organização e armazenamento de documentos e materiais de arquivo",
      "Produção sob medida conforme as dimensões definidas pelo cliente",
      "Estrutura resistente, ideal para empilhamento e armazenamento de longo prazo",
      "Opção de papelão onda B, C, D, BB ou BC, conforme o nível de resistência necessário",
      "Disponível nas cores pardo ou branco",
      "Possibilidade de produção com ou sem impressão personalizada",
      "Ideal para escritórios, empresas, instituições e organização de documentos físicos"
    ],
    "stepper": [
      "Variação",
      "Cor",
      "Impressão",
      "Dimensões"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a onda que deseja",
        "opcoes": [
          {
            "label": "B",
            "value": "b"
          },
          {
            "label": "C",
            "value": "c"
          },
          {
            "label": "D",
            "value": "d"
          },
          {
            "label": "BB",
            "value": "bb"
          },
          {
            "label": "BC",
            "value": "bc"
          }
        ]
      },
      {
        "tipo": "swatch",
        "titulo": "Escolha a cor",
        "opcoes": [
          {
            "label": "Pardo",
            "cor": "#e3b991"
          },
          {
            "label": "Branco",
            "cor": "#eeeeee"
          }
        ]
      },
      {
        "tipo": "toggle",
        "titulo": "Customização",
        "label": "Necessita de Impressão?",
        "ajuda": "Sim, com personalização de marca"
      },
      {
        "tipo": "texto",
        "titulo": "Dimensões customizadas",
        "placeholder": "Ex: 48x50x50"
      }
    ]
  },
  {
    "slug": "chapa-de-papelao",
    "nome": "Chapa de papelão",
    "categoriaId": "acessorio",
    "badge": "Suas medidas",
    "imagens": [
      "/produtos/chapa-de-papelao/0.webp"
    ],
    "descricao": [
      "Chapa de papelão resistente com excelente proteção e versatilidade para diversas aplicações",
      "Permite adaptação conforme a necessidade do cliente, podendo ser cortada em diferentes formatos e tamanhos",
      "Indicada para uso comercial, industrial, logístico e transporte de mercadorias",
      "Medidas: conforme solicitação do cliente."
    ],
    "stepper": [
      "Variação",
      "Cor",
      "Dimensões"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a onda que deseja",
        "opcoes": [
          {
            "label": "B",
            "value": "b"
          },
          {
            "label": "C",
            "value": "c"
          },
          {
            "label": "D",
            "value": "d"
          },
          {
            "label": "BB",
            "value": "bb"
          },
          {
            "label": "BC",
            "value": "bc"
          }
        ]
      },
      {
        "tipo": "swatch",
        "titulo": "Selecione a Cor",
        "opcoes": [
          {
            "label": "Pardo",
            "cor": "#e3b991"
          }
        ]
      },
      {
        "tipo": "texto",
        "titulo": "Dimensões customizadas",
        "placeholder": "Ex: 48x50x50"
      }
    ]
  },
  {
    "slug": "envelope",
    "nome": "Caixa Envoltório",
    "categoriaId": "caixa",
    "badge": "Suas medidas",
    "imagens": [
      "/produtos/envelope/0.webp"
    ],
    "descricao": [
      "Caixa envelope com abertura lateral tipo envelope, ideal para envio e apresentação de produtos planos",
      "Produção sob medida conforme as dimensões escolhidas pelo cliente",
      "Opção de papelão onda B, C, D, BB ou BC, de acordo com a necessidade de resistência",
      "Disponível nas cores pardo ou branco",
      "Possibilidade de produção com ou sem impressão personalizada",
      "Ideal para documentos, materiais gráficos, kits leves e produtos de pequeno volume"
    ],
    "stepper": [
      "Variação",
      "Cor",
      "Impressão",
      "Dimensões"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a onda que deseja",
        "opcoes": [
          {
            "label": "B",
            "value": "b"
          },
          {
            "label": "C",
            "value": "c"
          },
          {
            "label": "D",
            "value": "d"
          },
          {
            "label": "BB",
            "value": "bb"
          },
          {
            "label": "BC",
            "value": "bc"
          }
        ]
      },
      {
        "tipo": "swatch",
        "titulo": "Escolha a cor",
        "opcoes": [
          {
            "label": "Pardo",
            "cor": "#e3b991"
          },
          {
            "label": "Branco",
            "cor": "#eeeeee"
          }
        ]
      },
      {
        "tipo": "toggle",
        "titulo": "Customização",
        "label": "Necessita de Impressão?",
        "ajuda": "Sim, com personalização de marca"
      },
      {
        "tipo": "texto",
        "titulo": "Dimensões customizadas",
        "placeholder": "Ex: 48x50x50"
      }
    ]
  },
  {
    "slug": "tubo",
    "nome": "Caixa Tubo",
    "categoriaId": "caixa",
    "badge": "Suas medidas",
    "imagens": [
      "/produtos/tubo/0.webp"
    ],
    "descricao": [
      "Caixa tubo, desenvolvida para armazenamento e envio de produtos longos",
      "Produção sob medida conforme as dimensões definidas pelo cliente",
      "Opção de papelão onda B, C, D, BB ou BC, conforme o nível de resistência necessário",
      "Disponível nas cores pardo ou branco",
      "Possibilidade de produção com ou sem impressão personalizada",
      "Ideal para itens como brindes, peças alongadas e kits promocionais",
      "Excelente para melhor aproveitamento de espaço e empilhamento no transporte"
    ],
    "stepper": [
      "Variação",
      "Cor",
      "Impressão",
      "Dimensões"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a onda que deseja",
        "opcoes": [
          {
            "label": "B",
            "value": "b"
          },
          {
            "label": "C",
            "value": "c"
          },
          {
            "label": "D",
            "value": "d"
          },
          {
            "label": "BB",
            "value": "bb"
          },
          {
            "label": "BC",
            "value": "bc"
          }
        ]
      },
      {
        "tipo": "swatch",
        "titulo": "Escolha a cor",
        "opcoes": [
          {
            "label": "Pardo",
            "cor": "#e3b991"
          },
          {
            "label": "Branco",
            "cor": "#eeeeee"
          }
        ]
      },
      {
        "tipo": "toggle",
        "titulo": "Customização",
        "label": "Necessita de Impressão?",
        "ajuda": "Sim, com personalização de marca"
      },
      {
        "tipo": "texto",
        "titulo": "Dimensões customizadas",
        "placeholder": "Ex: 48x50x50"
      }
    ]
  },
  {
    "slug": "expositora",
    "nome": "Caixa Expositora",
    "categoriaId": "caixa",
    "badge": "Suas medidas",
    "imagens": [
      "/produtos/expositora/0.webp"
    ],
    "descricao": [
      "Caixa expositora desenvolvida para destacar produtos e melhorar a apresentação no ponto de venda",
      "Produção sob medida conforme as dimensões definidas pelo cliente",
      "Opção de papelão onda B, C, D, BB ou BC, conforme o nível de resistência necessário",
      "Disponível nas cores pardo ou branco",
      "Possibilidade de produção com ou sem impressão personalizada",
      "Ideal para vitrines, balcões, feiras e ações promocionais"
    ],
    "stepper": [
      "Variação",
      "Cor",
      "Impressão",
      "Dimensões"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a onda que deseja",
        "opcoes": [
          {
            "label": "B",
            "value": "b"
          },
          {
            "label": "C",
            "value": "c"
          },
          {
            "label": "D",
            "value": "d"
          },
          {
            "label": "BB",
            "value": "bb"
          },
          {
            "label": "BC",
            "value": "bc"
          }
        ]
      },
      {
        "tipo": "swatch",
        "titulo": "Escolha a cor",
        "opcoes": [
          {
            "label": "Pardo",
            "cor": "#e3b991"
          },
          {
            "label": "Branco",
            "cor": "#eeeeee"
          }
        ]
      },
      {
        "tipo": "toggle",
        "titulo": "Customização",
        "label": "Necessita de Impressão?",
        "ajuda": "Sim, com personalização de marca"
      },
      {
        "tipo": "texto",
        "titulo": "Dimensões customizadas",
        "placeholder": "Ex: 48x50x50"
      }
    ]
  },
  {
    "slug": "tampa-e-fundo",
    "nome": "Caixa Tampa e fundo",
    "categoriaId": "caixa",
    "badge": "Suas medidas",
    "imagens": [
      "/produtos/tampa-e-fundo/0.webp"
    ],
    "descricao": [
      "Caixa tampa e fundo com estrutura clássica de duas peças separadas, proporcionando melhor apresentação do produto",
      "Produção sob medida conforme as dimensões escolhidas pelo cliente",
      "Opção de papelão onda B, C, D, BB ou BC, de acordo com a resistência necessária para o uso",
      "Disponível nas cores pardo ou branco",
      "Possibilidade de produção com ou sem impressão personalizada",
      "Ideal para embalagens de maior valor agregado, presentes, kits e produtos que exigem uma apresentação mais elegante e organizada"
    ],
    "stepper": [
      "Variação",
      "Cor",
      "Impressão",
      "Dimensões"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a onda que deseja",
        "opcoes": [
          {
            "label": "B",
            "value": "b"
          },
          {
            "label": "C",
            "value": "c"
          },
          {
            "label": "D",
            "value": "d"
          },
          {
            "label": "BB",
            "value": "bb"
          },
          {
            "label": "BC",
            "value": "bc"
          }
        ]
      },
      {
        "tipo": "swatch",
        "titulo": "Escolha a cor",
        "opcoes": [
          {
            "label": "Pardo",
            "cor": "#e3b991"
          },
          {
            "label": "Branco",
            "cor": "#eeeeee"
          }
        ]
      },
      {
        "tipo": "toggle",
        "titulo": "Customização",
        "label": "Necessita de Impressão?",
        "ajuda": "Sim, com personalização de marca"
      },
      {
        "tipo": "texto",
        "titulo": "Dimensões customizadas",
        "placeholder": "Ex: 48x50x50"
      }
    ]
  },
  {
    "slug": "mala",
    "nome": "Caixa Mala",
    "categoriaId": "caixa",
    "badge": "Suas medidas",
    "imagens": [
      "/produtos/mala/0.webp"
    ],
    "descricao": [
      "Caixa mala com estrutura reforçada e alça integrada para transporte seguro e confortável",
      "Produção sob medida conforme as dimensões definidas pelo cliente",
      "Disponível em papelão onda B, BB ou BC, escolhidos conforme o nível de resistência necessário",
      "Opção de cor pardo ou branco",
      "Possibilidade de produção com ou sem impressão personalizada",
      "Ideal para kits, materiais promocionais, brindes e produtos que exigem apresentação mais sofisticada e transporte frequente"
    ],
    "stepper": [
      "Variação",
      "Cor",
      "Impressão",
      "Dimensões"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a onda que deseja",
        "opcoes": [
          {
            "label": "B",
            "value": "b"
          },
          {
            "label": "C",
            "value": "c"
          },
          {
            "label": "D",
            "value": "d"
          },
          {
            "label": "BB",
            "value": "bb"
          },
          {
            "label": "BC",
            "value": "bc"
          }
        ]
      },
      {
        "tipo": "swatch",
        "titulo": "Escolha a cor",
        "opcoes": [
          {
            "label": "Pardo",
            "cor": "#e3b991"
          },
          {
            "label": "Branco",
            "cor": "#eeeeee"
          }
        ]
      },
      {
        "tipo": "toggle",
        "titulo": "Customização",
        "label": "Necessita de Impressão?",
        "ajuda": "Sim, com personalização de marca"
      },
      {
        "tipo": "texto",
        "titulo": "Dimensões customizadas",
        "placeholder": "Ex: 48x50x50"
      }
    ]
  },
  {
    "slug": "maleta-30",
    "nome": "Caixa Maleta 30",
    "categoriaId": "caixa",
    "badge": "PRONTA-ENTREGA",
    "imagens": [
      "/produtos/maleta-30/0.webp"
    ],
    "descricao": [
      "Caixa maleta 30x30x30 pronta entrega, ideal para envios rápidos e organização de produtos",
      "Fabricada em papelão onda B ou BB, oferecendo boa resistência para transporte e armazenamento",
      "Disponível na cor pardo",
      "Ideal para kits, brindes, pequenos produtos e e-commerce",
      "Solução prática e econômica para embalagens de envio imediato"
    ],
    "destaque": true,
    "stepper": [
      "Variação",
      "Cor",
      "Impressão",
      "Dimensões"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a onda que deseja",
        "opcoes": [
          {
            "label": "B",
            "value": "b"
          }
        ]
      },
      {
        "tipo": "swatch",
        "titulo": "Escolha a cor",
        "opcoes": [
          {
            "label": "Pardo",
            "cor": "#e3b991"
          },
          {
            "label": "Branco",
            "cor": "#eeeeee"
          }
        ]
      },
      {
        "tipo": "toggle",
        "titulo": "Customização",
        "label": "Necessita de Impressão?",
        "ajuda": "Sim, com personalização de marca"
      },
      {
        "tipo": "texto",
        "titulo": "Dimensões customizadas",
        "placeholder": "Ex: 48x50x50"
      }
    ]
  },
  {
    "slug": "maleta-40",
    "nome": "Caixa Maleta 40",
    "categoriaId": "caixa",
    "badge": "PRONTA-ENTREGA",
    "imagens": [
      "/produtos/maleta-40/0.webp"
    ],
    "descricao": [
      "Caixa maleta 40x40x40 pronta entrega, ideal para envios rápidos e organização de produtos",
      "Fabricada em papelão onda B ou BB, oferecendo boa resistência para transporte e armazenamento",
      "Disponível na cor pardo",
      "Ideal para kits, brindes, pequenos produtos e e-commerce",
      "Solução prática e econômica para embalagens de envio imediato"
    ],
    "stepper": [
      "Variação",
      "Cor",
      "Impressão",
      "Dimensões"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a onda que deseja",
        "opcoes": [
          {
            "label": "B",
            "value": "b"
          }
        ]
      },
      {
        "tipo": "swatch",
        "titulo": "Escolha a cor",
        "opcoes": [
          {
            "label": "Pardo",
            "cor": "#e3b991"
          },
          {
            "label": "Branco",
            "cor": "#eeeeee"
          }
        ]
      },
      {
        "tipo": "toggle",
        "titulo": "Customização",
        "label": "Necessita de Impressão?",
        "ajuda": "Sim, com personalização de marca"
      },
      {
        "tipo": "texto",
        "titulo": "Dimensões customizadas",
        "placeholder": "Ex: 48x50x50"
      }
    ]
  },
  {
    "slug": "cantoneira-rigida",
    "nome": "Cantoneira rígida",
    "categoriaId": "cantoneira",
    "badge": "Suas medidas",
    "imagens": [
      "/produtos/cantoneira-rigida/0.webp"
    ],
    "descricao": [
      "Cantoneira rígida de papelão com alta resistência para proteção e reforço de cantos em embalagens e cargas",
      "Ideal para paletização, amarração e proteção de produtos durante transporte e armazenamento",
      "Proporciona maior estabilidade da carga e evita danos causados por cintas e impactos",
      "Indicada para uso comercial, industrial e logístico",
      "Disponível em diferentes medidas e espessuras, conforme necessidade do cliente."
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a opção desejada",
        "opcoes": [
          {
            "label": "Cantoneira rígida",
            "value": "cantoneira-rigida"
          }
        ]
      }
    ]
  },
  {
    "slug": "maleta",
    "nome": "Caixa Maleta",
    "categoriaId": "caixa",
    "badge": "Suas medidas",
    "imagens": [
      "/produtos/maleta/0.webp"
    ],
    "descricao": [
      "Caixa maleta com alça integrada, ideal para transporte prático e seguro de produtos",
      "Produção sob medida conforme as dimensões solicitadas pelo cliente",
      "Escolha entre papelão onda B, C, D, BB ou BC, de acordo com a resistência necessária",
      "Disponível nas cores pardo ou branco",
      "Opção de produção com ou sem impressão personalizada",
      "Indicada para kits, brindes, envios e apresentações de produtos com acabamento mais profissional"
    ],
    "stepper": [
      "Variação",
      "Cor",
      "Impressão",
      "Dimensões"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a onda que deseja",
        "opcoes": [
          {
            "label": "B",
            "value": "b"
          },
          {
            "label": "C",
            "value": "c"
          },
          {
            "label": "D",
            "value": "d"
          },
          {
            "label": "BB",
            "value": "bb"
          },
          {
            "label": "BC",
            "value": "bc"
          }
        ]
      },
      {
        "tipo": "swatch",
        "titulo": "Escolha a cor",
        "opcoes": [
          {
            "label": "Pardo",
            "cor": "#e3b991"
          },
          {
            "label": "Branco",
            "cor": "#eeeeee"
          }
        ]
      },
      {
        "tipo": "toggle",
        "titulo": "Customização",
        "label": "Necessita de Impressão?",
        "ajuda": "Sim, com personalização de marca"
      },
      {
        "tipo": "texto",
        "titulo": "Dimensões customizadas",
        "placeholder": "Ex: 48x50x50"
      }
    ]
  },
  {
    "slug": "corte-vinco",
    "nome": "Caixa Corte vinco",
    "categoriaId": "caixa",
    "badge": "Suas medidas",
    "imagens": [
      "/produtos/corte-vinco/0.webp"
    ],
    "descricao": [
      "Caixa corte vinco produzida sob medida conforme a necessidade do cliente",
      "Escolha entre papelão onda B, C, D, BB ou BC, conforme nível de resistência desejado",
      "Opção de cor: pardo ou branco",
      "Possibilidade de produção com ou sem impressão personalizada"
    ],
    "destaque": true,
    "stepper": [
      "Variação",
      "Cor",
      "Impressão",
      "Dimensões"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a onda que deseja",
        "opcoes": [
          {
            "label": "B",
            "value": "b"
          },
          {
            "label": "C",
            "value": "c"
          },
          {
            "label": "D",
            "value": "d"
          },
          {
            "label": "BB",
            "value": "bb"
          },
          {
            "label": "BC",
            "value": "bc"
          }
        ]
      },
      {
        "tipo": "swatch",
        "titulo": "Escolha a cor",
        "opcoes": [
          {
            "label": "Pardo",
            "cor": "#e3b991"
          },
          {
            "label": "Branco",
            "cor": "#eeeeee"
          }
        ]
      },
      {
        "tipo": "toggle",
        "titulo": "Customização",
        "label": "Necessita de Impressão?",
        "ajuda": "Sim, com personalização de marca"
      },
      {
        "tipo": "texto",
        "titulo": "Dimensões customizadas",
        "placeholder": "Ex: 48x50x50"
      }
    ]
  },
  {
    "slug": "manta-de-polietileno",
    "nome": "Manta de polietileno expandida",
    "categoriaId": "bobina",
    "badge": "Consultar medidas",
    "imagens": [
      "/produtos/manta-de-polietileno/0.webp"
    ],
    "descricao": [
      "Bobina de manta de polietileno com excelente proteção contra impactos, umidade e riscos superficiais",
      "Altura: 1,20m. Disponível em diferentes gramaturas e metragens",
      "Ideal para isolamento térmico/acústico, proteção de produtos durante transporte e armazenamento",
      "Indicada para uso comercial, industrial, construção civil e mudanças."
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha o tamanho que deseja",
        "opcoes": [
          {
            "label": "1mm",
            "sublabel": "300m",
            "value": "1mm-300m"
          },
          {
            "label": "2mm",
            "sublabel": "150m",
            "value": "2mm-150m"
          }
        ]
      }
    ]
  },
  {
    "slug": "maleta-20",
    "nome": "Caixa Maleta 20",
    "categoriaId": "caixa",
    "badge": "PRONTA-ENTREGA",
    "imagens": [
      "/produtos/maleta-20/0.webp"
    ],
    "descricao": [
      "Caixa maleta 20x20x20 pronta entrega, ideal para envios rápidos e organização de produtos",
      "Fabricada em papelão onda B ou BB, oferecendo boa resistência para transporte e armazenamento",
      "Disponível na cor pardo",
      "Ideal para kits, brindes, pequenos produtos e e-commerce",
      "Solução prática e econômica para embalagens de envio imediato"
    ],
    "stepper": [
      "Variação",
      "Cor",
      "Impressão",
      "Dimensões"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha a onda que deseja",
        "opcoes": [
          {
            "label": "B",
            "value": "b"
          }
        ]
      },
      {
        "tipo": "swatch",
        "titulo": "Escolha a cor",
        "opcoes": [
          {
            "label": "Pardo",
            "cor": "#e3b991"
          },
          {
            "label": "Branco",
            "cor": "#eeeeee"
          }
        ]
      },
      {
        "tipo": "toggle",
        "titulo": "Customização",
        "label": "Necessita de Impressão?",
        "ajuda": "Sim, com personalização de marca"
      },
      {
        "tipo": "texto",
        "titulo": "Dimensões customizadas",
        "placeholder": "Ex: 48x50x50"
      }
    ]
  },
  {
    "slug": "bobina-stretch",
    "nome": "Bobina Stretch",
    "categoriaId": "bobina",
    "badge": "Consultar medidas",
    "imagens": [
      "/produtos/bobina-stretch/0.webp"
    ],
    "descricao": [
      "Bobina stretch com alta elasticidade e resistência para proteção e estabilização de cargas",
      "Ideal para paletização, agrupamento de produtos e proteção contra poeira e umidade",
      "Indicada para uso comercial, industrial e logístico",
      "Disponível em diferentes larguras e pesos. Consulte as opções disponíveis."
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha o tamanho que deseja",
        "opcoes": [
          {
            "label": "500mm x 0.025 x 200mt",
            "sublabel": "COM TUBO",
            "value": "500mm-x-0025-x-200mt-com-tubo"
          },
          {
            "label": "500mm x 0.025 x 200mt",
            "sublabel": "SEM TUBO",
            "value": "500mm-x-0025-x-200mt-sem-tubo"
          }
        ]
      }
    ]
  },
  {
    "slug": "manopla-stretch",
    "nome": "Manopla Stretch",
    "categoriaId": "bobina",
    "badge": "10cm",
    "imagens": [
      "/produtos/manopla-stretch/0.webp"
    ],
    "descricao": [
      "Manopla stretch para aplicação manual de filme stretch com maior praticidade e controle",
      "Ideal para envolvimento de caixas, paletização leve e proteção de embalagens no transporte",
      "Proporciona aplicação mais firme e uniforme, reduzindo desperdício de material",
      "Indicada para uso comercial, industrial e logístico",
      "Medida: 10cm."
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha o tamanho que deseja",
        "opcoes": [
          {
            "label": "10cm",
            "value": "10cm"
          }
        ]
      }
    ]
  },
  {
    "slug": "salva-piso",
    "nome": "Bobina Salva piso",
    "categoriaId": "bobina",
    "badge": "1.20m",
    "imagens": [
      "/produtos/salva-piso/0.webp"
    ],
    "descricao": [
      "Bobina salva piso desenvolvida para proteger superfícies durante obras, reformas e pinturas",
      "Ideal para cobrir pisos e evitar riscos, sujeira, respingos e pequenos impactos",
      "Proporciona praticidade na aplicação e remoção",
      "Indicada para uso residencial, comercial e industrial."
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha o tamanho que deseja",
        "opcoes": [
          {
            "label": "1.20m",
            "value": "120m"
          }
        ]
      }
    ]
  },
  {
    "slug": "plastico-bolha",
    "nome": "Bobina Plástico bolha",
    "categoriaId": "bobina",
    "badge": "Consultar medidas",
    "imagens": [
      "/produtos/plastico-bolha/0.webp"
    ],
    "descricao": [
      "Bobina de plástico bolha com excelente proteção contra impactos e vibrações",
      "Ideal para embalagem de produtos frágeis, eletrônicos, vidros e peças sensíveis",
      "Indicada para uso comercial, industrial, logístico e e-commerce",
      "Disponível em diferentes larguras e metragens. Consulte as opções disponíveis."
    ],
    "destaque": true,
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha o tamanho que deseja",
        "opcoes": [
          {
            "label": "1.30m",
            "value": "130m"
          },
          {
            "label": "60cm",
            "value": "60cm"
          }
        ]
      }
    ]
  },
  {
    "slug": "bobina-semikraft",
    "nome": "Bobina Semikraft",
    "categoriaId": "bobina",
    "badge": "60cm",
    "imagens": [
      "/produtos/bobina-semikraft/0.webp"
    ],
    "descricao": [
      "Bobina semikraft com boa resistência e excelente custo-benefício para diversas aplicações",
      "Ideal para embrulho, proteção de produtos e preenchimento de embalagens",
      "Indicada para uso comercial, industrial, logístico e e-commerce",
      "Medida: 60cm."
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha o tamanho que deseja",
        "opcoes": [
          {
            "label": "60cm",
            "value": "60cm"
          }
        ]
      }
    ]
  },
  {
    "slug": "bobina-kraftmono",
    "nome": "Bobina Kraftmono",
    "categoriaId": "bobina",
    "badge": "40cm",
    "imagens": [
      "/produtos/bobina-kraftmono/0.webp"
    ],
    "descricao": [
      "Bobina de papel kraft mono 80g com excelente resistência e acabamento de qualidade",
      "Ideal para embrulho, proteção de produtos e processos de embalagem",
      "Indicada para uso comercial, industrial, logístico e e-commerce",
      "Medidas: 40cm. Gramatura: 80g."
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha o tamanho que deseja",
        "opcoes": [
          {
            "label": "40cm",
            "sublabel": "80g",
            "value": "40cm-80g"
          }
        ]
      }
    ]
  },
  {
    "slug": "bobina-kraft",
    "nome": "Bobina Kraft",
    "categoriaId": "bobina",
    "badge": "Consultar medidas",
    "imagens": [
      "/produtos/bobina-kraft/0.webp"
    ],
    "descricao": [
      "Bobina de papel kraft 80g com acabamento natural e excelente resistência",
      "Ideal para embrulho, proteção de produtos, preenchimento de embalagens e processos de expedição",
      "Indicada para uso comercial, industrial, logístico e e-commerce",
      "Disponível em diferentes larguras e metragens. Consulte as opções disponíveis."
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha o tamanho que deseja",
        "opcoes": [
          {
            "label": "40cm",
            "value": "40cm"
          },
          {
            "label": "60cm",
            "value": "60cm"
          },
          {
            "label": "1m",
            "value": "1m"
          }
        ]
      }
    ]
  },
  {
    "slug": "papelao-ondulado",
    "nome": "Bobina Papelão ondulado",
    "categoriaId": "bobina",
    "badge": "1.20m",
    "imagens": [
      "/produtos/papelao-ondulado/0.webp"
    ],
    "descricao": [
      "Bobina de papelão ondulado com excelente proteção contra impactos e riscos",
      "Ideal para envolver produtos, móveis, peças e mercadorias durante armazenamento e transporte",
      "Indicada para uso comercial, industrial, logístico e mudanças",
      "Medida: 1,20m."
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha o tamanho que deseja",
        "opcoes": [
          {
            "label": "1.20m",
            "value": "120m"
          }
        ]
      }
    ]
  },
  {
    "slug": "gomada",
    "nome": "Fita Gomada",
    "categoriaId": "fita",
    "badge": "Consultar medidas",
    "imagens": [
      "/produtos/gomada/0.webp"
    ],
    "descricao": [
      "Fita gomada sem reforço com excelente aderência para fechamento de embalagens",
      "Ideal para caixas de papelão leves e médias, garantindo um fechamento seguro",
      "Ativada com água, proporcionando uma fixação firme e acabamento discreto",
      "Indicada para uso comercial, industrial, logístico e e-commerce"
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha o tamanho que deseja",
        "opcoes": [
          {
            "label": "60mm",
            "value": "60mm"
          },
          {
            "label": "70mm",
            "value": "70mm"
          },
          {
            "label": "80mm",
            "value": "80mm"
          },
          {
            "label": "60mm",
            "sublabel": "PERSONALIZADA",
            "value": "60mm-personalizada"
          },
          {
            "label": "70mm",
            "sublabel": "PERSONALIZADA",
            "value": "70mm-personalizada"
          },
          {
            "label": "80mm",
            "sublabel": "PERSONALIZADA",
            "value": "80mm-personalizada"
          }
        ]
      }
    ]
  },
  {
    "slug": "arquear",
    "nome": "Fita Arquear",
    "categoriaId": "fita",
    "badge": "10mm x 2200m",
    "imagens": [
      "/produtos/arquear/0.webp"
    ],
    "descricao": [
      "Fita de arquear resistente, ideal para paletização e fechamento de volumes",
      "Proporciona alta resistência à tração, ajudando a manter a estabilidade da carga durante o manuseio e transporte",
      "Medidas: 10mm x 0,65mm. Rolo com 2200m."
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha o tamanho que deseja",
        "opcoes": [
          {
            "label": "10mm x 0.65mm 2200m",
            "value": "10mm-x-065mm-2200m"
          }
        ]
      }
    ]
  },
  {
    "slug": "crepe",
    "nome": "Fita Crepe",
    "categoriaId": "fita",
    "badge": "Consultar medidas",
    "imagens": [
      "/produtos/crepe/0.webp"
    ],
    "descricao": [
      "Fita crepe com excelente aderência e remoção prática",
      "Ideal para pinturas, mascaramento, artesanato e aplicações em geral",
      "Fácil de aplicar, proporcionando acabamento limpo e preciso",
      "Indicada para uso doméstico, comercial e profissional."
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha o tamanho que deseja",
        "opcoes": [
          {
            "label": "18x45",
            "value": "18x45"
          },
          {
            "label": "18x50",
            "value": "18x50"
          },
          {
            "label": "24x45",
            "value": "24x45"
          },
          {
            "label": "24x50",
            "value": "24x50"
          },
          {
            "label": "48x45",
            "value": "48x45"
          },
          {
            "label": "48x50",
            "value": "48x50"
          }
        ]
      }
    ]
  },
  {
    "slug": "fita-acrilica-personalizada",
    "nome": "Fita Acrílica - Personalizada",
    "categoriaId": "fita",
    "badge": "48x100",
    "imagens": [
      "/produtos/fita-acrilica-personalizada/0.webp"
    ],
    "descricao": [
      "Fita adesiva acrílica personalizada com impressão de alta qualidade em fundo transparente ou branco",
      "Personalização em até 2 cores para destacar a sua marca",
      "Excelente aderência para o fechamento seguro de caixas e embalagens",
      "Ideal para reforçar a identidade visual e agregar profissionalismo aos envios",
      "Rolo de 48mm x 100m."
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha o tamanho que deseja",
        "opcoes": [
          {
            "label": "48x100 - 2 CORES",
            "sublabel": "FUNDO TRANSPARENTE",
            "value": "48x100-2-cores-fundo-transparente"
          },
          {
            "label": "48x100 - 2 CORES",
            "sublabel": "FUNDO BRANCO",
            "value": "48x100-2-cores-fundo-branco"
          }
        ]
      }
    ]
  },
  {
    "slug": "fragil",
    "nome": "Fita Acrílica - \"Cuidado frágil\"",
    "categoriaId": "fita",
    "badge": "48x50",
    "imagens": [
      "/produtos/fragil/0.webp"
    ],
    "descricao": [
      "Fita adesiva acrílica com impressão \"Cuidado Frágil\" de alta visibilidade",
      "Ideal para identificar embalagens que exigem maior cuidado no transporte",
      "Excelente aderência para o fechamento seguro de caixas e encomendas",
      "Facilita a identificação de produtos frágeis durante o armazenamento e envio",
      "Rolo 48mm x 50m."
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha o tamanho que deseja",
        "opcoes": [
          {
            "label": "48x50",
            "value": "48x50"
          }
        ]
      }
    ]
  },
  {
    "slug": "fita-kraft",
    "nome": "Fita Kraft",
    "categoriaId": "fita",
    "badge": "Consultar medidas",
    "imagens": [
      "/produtos/fita-kraft/0.webp"
    ],
    "descricao": [
      "Fita kraft com acabamento natural e excelente aderência",
      "Ideal para o fechamento de caixas de papelão e embalagens em geral",
      "Proporciona um visual sustentável e profissional às embalagens",
      "Indicada para uso comercial, industrial e logístico."
    ],
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha o tamanho que deseja",
        "opcoes": [
          {
            "label": "18x50",
            "value": "18x50"
          },
          {
            "label": "24x50",
            "value": "24x50"
          },
          {
            "label": "48x50",
            "value": "48x50"
          }
        ]
      }
    ]
  },
  {
    "slug": "acrilica",
    "nome": "Fita Acrílica",
    "categoriaId": "fita",
    "badge": "Consultar medidas",
    "imagens": [
      "/produtos/acrilica/0.webp"
    ],
    "descricao": [
      "Fita adesiva acrílica com alta resistência e excelente aderência",
      "Ideal para o fechamento de caixas de papelão e embalagens em geral",
      "Boa performance em diferentes superfícies e temperaturas ambientes",
      "Transparente, proporcionando acabamento limpo",
      "Indicada para uso comercial, industrial e logístico"
    ],
    "destaque": true,
    "variacoes": [
      {
        "tipo": "opcoes",
        "titulo": "Escolha o tamanho que deseja",
        "opcoes": [
          {
            "label": "48x50",
            "sublabel": "CONTÉM 100 ROLOS",
            "value": "48x50-contem-100-rolos"
          },
          {
            "label": "48x100",
            "sublabel": "CONTÉM 80 ROLOS",
            "value": "48x100-contem-80-rolos"
          },
          {
            "label": "48x100 - Hot Melt",
            "sublabel": "CONTÉM 72 ROLOS",
            "value": "48x100-hot-melt-contem-72-rolos"
          },
          {
            "label": "48x1200 - Hot Melt",
            "sublabel": "CONTÉM 6 ROLOS",
            "value": "48x1200-hot-melt-contem-6-rolos"
          }
        ]
      }
    ]
  }
]

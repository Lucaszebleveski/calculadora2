// Elementos principais
        const inputsDiv = document.getElementById('inputs');
        const opcao = document.getElementById('opcao');
        const convSelect = document.getElementById('convensao');
        const resultado = document.getElementById('resultado');
        const btnCalcular = document.getElementById('calculFar');
        // Visualização triângulo
        const spanOposto = document.getElementById('valor-oposto');
        const spanAdjacente = document.getElementById('valor-adjacente');
        const spanAngulo = document.getElementById('valor-angulo');
        const spanHipotenusa = document.getElementById('valor-hipotenusa');

        // Atualiza legendas dos lados conforme convenção
        function atualizarLegendasTriangulo() {
            if (convSelect.value === 'codigo') {
                spanOposto.textContent = 'Altura';
                spanAdjacente.textContent = 'Distância';
            } else {
                spanOposto.textContent = 'Distância';
                spanAdjacente.textContent = 'Altura';
            }
            spanAngulo.textContent = 'Ângulo';
            spanHipotenusa.textContent = 'Hipotenusa';
        }

        // Atualiza os valores nos lados do triângulo
        function atualizarVisualizacao() {
            const anguloInput = document.getElementById('angulo');
            const alturaInput = document.getElementById('altura');
            const distanciaInput = document.getElementById('distancia');
            const tipoCalculo = opcao.value;

            // Altura / Distância nos lados de acordo com convenção e tipo
            if (convSelect.value === 'codigo') {
                // Oposto = altura, adjacente = distância
                spanOposto.textContent = alturaInput && alturaInput.value ? alturaInput.value + ' m' : 'Altura';
                spanAdjacente.textContent = distanciaInput && distanciaInput.value ? distanciaInput.value + ' m' : 'Distância';
            } else {
                // Oposto = distância, adjacente = altura
                spanOposto.textContent = distanciaInput && distanciaInput.value ? distanciaInput.value + ' m' : 'Distância';
                spanAdjacente.textContent = alturaInput && alturaInput.value ? alturaInput.value + ' m' : 'Altura';
            }
            spanAngulo.textContent = anguloInput && anguloInput.value ? anguloInput.value + '°' : 'Ângulo';
            spanHipotenusa.textContent = 'Hipotenusa';
        }

        // Atualiza campos conforme o cálculo escolhido
        function atualizarCampos() {
            const tipo = opcao.value;
            let campos = '';
            if (tipo === 'altura') {
                campos = `
                  <input type="number" id="angulo" placeholder="Ângulo (em graus)" step="any">
                  <input type="number" id="distancia" placeholder="Distância (m)" step="any">
                `;
            } else if (tipo === 'distancia') {
                campos = `
                  <input type="number" id="angulo" placeholder="Ângulo (em graus)" step="any">
                  <input type="number" id="altura" placeholder="Altura (m)" step="any">
                `;
            } else if (tipo === 'angulo') {
                campos = `
                  <input type="number" id="altura" placeholder="Altura (m)" step="any">
                  <input type="number" id="distancia" placeholder="Distância (m)" step="any">
                `;
            } else if (tipo === 'hipotenusa') {
                campos = `
                  <input type="number" id="altura" placeholder="Altura (m)" step="any">
                  <input type="number" id="distancia" placeholder="Distância (m)" step="any">
                `;
            }
            inputsDiv.innerHTML = campos;
            resultado.innerHTML = '';

            atualizarLegendasTriangulo();
            atualizarVisualizacao();

            // Liga os novos inputs ao atualizarVisualizacao
            const novosInputs = inputsDiv.querySelectorAll('input');
            novosInputs.forEach(input => {
                input.addEventListener('input', atualizarVisualizacao);
            });
        }

        // Cálculo principal
        function calcular() {
            const tipo = opcao.value;
            const conv = convSelect.value;
            const angulo = parseFloat(document.getElementById('angulo')?.value);
            const altura = parseFloat(document.getElementById('altura')?.value);
            const distancia = parseFloat(document.getElementById('distancia')?.value);

            let res = 0;
            let valorCalculado = '';

            if ((tipo === 'altura' && (isNaN(angulo) || isNaN(distancia))) ||
                (tipo === 'distancia' && (isNaN(angulo) || isNaN(altura))) ||
                (tipo === 'angulo' && (isNaN(altura) || isNaN(distancia))) ||
                (tipo === 'hipotenusa' && (isNaN(altura) || isNaN(distancia)))) {
                resultado.innerHTML = 'Preencha todos os campos!';
                atualizarVisualizacao();
                return;
            }

            if (tipo === 'altura') {
                if (conv === 'codigo') {
                    res = distancia * Math.tan(angulo * Math.PI / 180);
                } else {
                    res = distancia / Math.tan(angulo * Math.PI / 180);
                }
                valorCalculado = res.toFixed(2);
                resultado.innerHTML = `Altura = ${valorCalculado} m`;
                spanOposto.textContent = valorCalculado + ' m';
            } else if (tipo === 'distancia') {
                if (conv === 'codigo') {
                    res = altura / Math.tan(angulo * Math.PI / 180);
                } else {
                    res = altura * Math.tan(angulo * Math.PI / 180);
                }
                valorCalculado = res.toFixed(2);
                resultado.innerHTML = `Distância = ${valorCalculado} m`;
                spanAdjacente.textContent = valorCalculado + ' m';
            } else if (tipo === 'angulo') {
                res = Math.atan(altura / distancia) * (180 / Math.PI);
                valorCalculado = res.toFixed(2);
                resultado.innerHTML = `Ângulo = ${valorCalculado}°`;
                spanAngulo.textContent = valorCalculado + '°';
            } else if (tipo === 'hipotenusa') {
                res = Math.sqrt(altura * altura + distancia * distancia);
                valorCalculado = res.toFixed(2);
                resultado.innerHTML = `Hipotenusa = ${valorCalculado} m`;
                spanHipotenusa.textContent = valorCalculado + ' m';
            }
        }

        opcao.addEventListener('change', atualizarCampos);
        convSelect.addEventListener('change', () => {
            atualizarLegendasTriangulo();
            atualizarVisualizacao();
        });
        btnCalcular.addEventListener('click', calcular);

        // Inicializa!
        atualizarCampos();
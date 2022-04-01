import { IUnidade } from "../../interfaces/IUnidade"
import { AjustarProdutoRow } from "./AjustarProdutoRow"
export interface AjusteMetasFiltroOption {
  label: string
  group: 'Cluster' | 'SEV' | 'Unidades' | 'Erros'
  item: string | number | IUnidade | boolean
}


export const getOptions = (rows: AjustarProdutoRow[]): AjusteMetasFiltroOption[] => {
  let sevs: number[] = []
  let unidades: IUnidade[] = []
  let clusters: string[] = []
  if (rows.length > 0)
  rows.forEach(r => {
    const foundUnidades = unidades.find(un => un.id == r.Unidade.id);
    if (!foundUnidades) {
      unidades.push(r.Unidade)
    }

    const foundCluster = clusters.find(cluster => cluster == r.Unidade.cluster);
    if (!foundCluster) {
      clusters.push(r.Unidade.cluster)
    }

    const foundSevs = sevs.find(sev => sev === r.Unidade.se);
    if (!foundSevs) {
      sevs.push(r.Unidade.se)
    }
  })

  sevs = sevs.sort((a, b) => a - b)
  unidades = unidades.sort((a, b) => a.id - b.id)
  clusters = clusters.sort((a, b) => a < b ? -1 : (a > b ? 1 : 0))

  const options: AjusteMetasFiltroOption[] = []

  const o: AjusteMetasFiltroOption = {
    label: 'Unidades com erros',
    group: 'Erros',
    item: true
  }
  options.push(o)


  clusters.forEach(cluster => {
    const o: AjusteMetasFiltroOption = {
      label: cluster,
      group: 'Cluster',
      item: cluster
    }
    options.push(o)
  })

  if (sevs.length > 1) {
  sevs.forEach(sev => {
    const o: AjusteMetasFiltroOption = {
      label: sev.toString(),
      group: 'SEV',
      item: sev
    }
    options.push(o)
  })
  }

  unidades.forEach(un => {
    const o: AjusteMetasFiltroOption = {
      label: un.nome,
      group: 'Unidades',
      item: un
    }
    options.push(o)
  })





  return options
}

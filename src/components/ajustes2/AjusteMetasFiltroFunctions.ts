import { IUnidade } from "../../core/interfaces/IUnidade"
import { AjustarProdutoRow } from "../../core/model/AjustarProdutoRow"
import { IAjusteMetasFiltro } from "../../core/model/AjusteMetas"
import { IUseAjuste } from "../../hooks/useAjustePorAgregador"

export interface AjusteMetasFiltroOption {
  label: string
  group: 'Cluster' | 'SEV' | 'Unidades'
  item: string | number | IUnidade
}

export const getFiltro = (options: AjusteMetasFiltroOption[]): IAjusteMetasFiltro => {
  const f: IAjusteMetasFiltro = {
    sevs: [],
    unidades: [],
    cluster: []
  }

  options.forEach(op => {
    switch (op.group) {
      case 'Cluster':
        if (typeof op.item === 'string')
          f.cluster.push(op.item)
        break
      case 'SEV':
        if (typeof op.item === 'number')
          f.sevs.push(op.item)
      case 'Unidades':
        if (typeof op.item === 'object')
          f.unidades.push(op.item)
        break
    }
  })

  return f
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
  clusters = clusters.sort((a, b) => a < b ? -1 : (b > a ? 1 : 0))

  const options: AjusteMetasFiltroOption[] = []
  clusters.forEach(cluster => {
    const o: AjusteMetasFiltroOption = {
      label: cluster,
      group: 'Cluster',
      item: cluster
    }
    options.push(o)
  })

  sevs.forEach(sev => {
    const o: AjusteMetasFiltroOption = {
      label: sev.toString(),
      group: 'SEV',
      item: sev
    }
    options.push(o)
  })

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

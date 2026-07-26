export default {
  archEvolution: {
    title: '架构演进路径',
    subtitle: '点击查看每个阶段的架构特点',
    scaleLabel: '适用规模：',
    challengeLabel: '核心挑战：',
    stages: [
      {
        key: 'monolith',
        name: '单体架构',
        desc: '所有功能打包在一个应用中，共享一个数据库。简单直接，适合早期快速迭代。',
        scale: '团队 < 10 人，日活 < 10 万',
        challenge: '代码耦合严重，一个模块的 Bug 可能拖垮整个系统',
        boxes: [
          { label: '用户模块', type: 'module' },
          { label: '订单模块', type: 'module' },
          { label: '支付模块', type: 'module' },
          { label: '商品模块', type: 'module' },
          { label: '单体应用（一个进程）', type: 'container' },
          { label: 'MySQL', type: 'db' }
        ]
      },
      {
        key: 'modular',
        name: '模块化单体',
        desc: '在单体内部按业务域划分模块，模块间通过接口通信。是微服务的前置步骤。',
        scale: '团队 10-30 人',
        challenge: '模块边界容易被打破，需要纪律性',
        boxes: [
          { label: '用户域', type: 'domain' },
          { label: '订单域', type: 'domain' },
          { label: '支付域', type: 'domain' },
          { label: '内部 API 边界', type: 'boundary' },
          { label: 'MySQL', type: 'db' }
        ]
      },
      {
        key: 'soa',
        name: '服务化（SOA）',
        desc: '按业务能力拆分为独立服务，通过 ESB 或 API 网关通信。每个服务可以独立部署。',
        scale: '团队 30-100 人',
        challenge: '服务间调用链变长，需要服务治理',
        boxes: [
          { label: '用户服务', type: 'service' },
          { label: '订单服务', type: 'service' },
          { label: '支付服务', type: 'service' },
          { label: 'API 网关', type: 'gateway' },
          { label: '各自数据库', type: 'db' }
        ]
      },
      {
        key: 'microservices',
        name: '微服务架构',
        desc: '更细粒度的服务拆分，每个服务独立开发、部署、扩缩容。配合容器化和 K8s。',
        scale: '团队 100+ 人，日活百万+',
        challenge: '分布式复杂性、数据一致性、运维成本',
        boxes: [
          { label: '用户服务', type: 'service' },
          { label: '认证服务', type: 'service' },
          { label: '订单服务', type: 'service' },
          { label: '库存服务', type: 'service' },
          { label: '支付服务', type: 'service' },
          { label: '通知服务', type: 'service' },
          { label: 'API Gateway + Service Mesh', type: 'gateway' },
          { label: '独立数据库 x N', type: 'db' }
        ]
      }
    ]
  }
}

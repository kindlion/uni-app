import { isComponentTag } from '@dcloudio/uni-shared'
import {
  AttributeNode,
  ComponentNode,
  ElementNode,
  ElementTypes,
  isCoreComponent,
  locStub,
  NodeTypes,
  RootNode,
  TemplateChildNode,
  TransformContext,
} from '@vue/compiler-core'

export const VUE_REF = 'r'
export const VUE_REF_IN_FOR = 'r-i-f'

export function isUserComponent(
  node: RootNode | TemplateChildNode,
  context: TransformContext
): node is ComponentNode {
  return (
    node.type === NodeTypes.ELEMENT &&
    node.tagType === ElementTypes.COMPONENT &&
    !isComponentTag(node.tag) &&
    !isCoreComponent(node.tag) &&
    !context.isBuiltInComponent(node.tag)
  )
}

export function createAttributeNode(
  name: string,
  content: string
): AttributeNode {
  return {
    type: NodeTypes.ATTRIBUTE,
    loc: locStub,
    name,
    value: {
      type: NodeTypes.TEXT,
      loc: locStub,
      content,
    },
  }
}

function createClassAttribute(clazz: string): AttributeNode {
  return createAttributeNode('class', clazz)
}

export function addStaticClass(node: ElementNode, clazz: string) {
  const classProp = node.props.find(
    (prop) => prop.type === NodeTypes.ATTRIBUTE && prop.name === 'class'
  ) as AttributeNode | undefined

  if (!classProp) {
    return node.props.unshift(createClassAttribute(clazz))
  }

  if (classProp.value) {
    return (classProp.value.content = classProp.value.content + ' ' + clazz)
  }
  classProp.value = {
    type: NodeTypes.TEXT,
    loc: locStub,
    content: clazz,
  }
}
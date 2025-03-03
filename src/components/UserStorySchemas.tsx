import { Node, mergeAttributes } from '@tiptap/core'
import BulletList from '@tiptap/extension-bullet-list'

const UserStoryTitleNode = Node.create({
  name: 'userStoryTitle',
  group: 'block',
  content: 'text*',
  defining: true,
  isolating: true,
  selectable: true,
  draggable: false,
  parseHTML() {
    return [{ tag: 'h1[data-type="userStoryTitle"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['h1', mergeAttributes(HTMLAttributes, { 
      'data-type': 'userStoryTitle',
      class: 'userstory-title'
    }), 0]
  },
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        // Предотвращаем Enter и перемещаем фокус на следующий узел
        const { state } = editor;
        const { $from } = state.selection;
        const after = $from.after();
        
        if (after) {
          editor.commands.setNodeSelection(after);
        }
        return true;
      }
    }
  }
})

const UserStoryQuestionNode = Node.create({
  name: 'userStoryQuestion',
  group: 'block',
  content: 'text*',
  defining: true,
  parseHTML() {
    return [{ tag: 'h3[data-type="userStoryQuestion"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['h3', mergeAttributes(HTMLAttributes, {
      'data-type': 'userStoryQuestion',
      class: 'userstory-question'
    }), 0]
  }
})

const UserStoryCriteriaContainerNode = Node.create({
  name: 'userStoryCriteriaContainer',
  group: 'block',
  content: 'userStoryCriteria',
  defining: true,
  parseHTML() {
    return [{ tag: 'div[data-type="userStoryCriteriaContainer"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, {
      'data-type': 'userStoryCriteriaContainer',
      class: 'userstory-criteria-container'
    }), 0]
  }
})
const CustomBulletList = BulletList.extend({
  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const { $from } = this.editor.state.selection;
        const currentNode = $from.parent;
        
        if (currentNode.content.size === 0) {
          return false;
        }
        
        return true;
      }
    }
  }
})

const UserStoryCriteriaNode = Node.create({
  name: 'userStoryCriteria',
  group: 'block',
  content: 'bulletList',
  defining: true,
  parseHTML() {
    return [{ tag: 'div[data-type="userStoryCriteria"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, {
      'data-type': 'userStoryCriteria',
      class: 'userstory-criteria'
    }), 0]
  }
})

const UserStoryImplementationContainerNode = Node.create({
  name: 'userStoryImplementationContainer',
  group: 'block',
  content: 'userStoryImplementation',
  defining: true,
  isolating: true,
  selectable: false,
  parseHTML() {
    return [{ tag: 'div[data-type="userStoryImplementationContainer"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, {
      'data-type': 'userStoryImplementationContainer',
      class: 'userstory-implementation-container'
    }), 0]
  }
})

const UserStoryImplementationNode = Node.create({
  name: 'userStoryImplementation',
  group: 'block',
  content: 'implementationParagraph+',
  defining: true,
  isolating: true,
  selectable: true,
  draggable: false,
  parseHTML() {
    return [{ tag: 'div[data-type="userStoryImplementation"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, {
      'data-type': 'userStoryImplementation',
      class: 'userstory-implementation'
    }), 0]
  }
})

const ImplementationParagraphNode = Node.create({
  name: 'implementationParagraph',
  group: 'block',
  content: 'text*',
  parseHTML() {
    return [{ tag: 'p[data-type="implementationParagraph"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(HTMLAttributes, {
      'data-type': 'implementationParagraph'
    }), 0]
  }
})

const UserStoryDocNode = Node.create({
  name: 'doc',
  topNode: true,
  content: 'userStoryTitle userStoryQuestion userStoryCriteriaContainer{1} userStoryImplementationContainer{1}',
  parseHTML() {
    return [{ tag: 'div.userstory-doc' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { class: 'userstory-doc' }), 0]
  }
})

export { 
  UserStoryTitleNode, 
  UserStoryQuestionNode,
  UserStoryCriteriaContainerNode,
  UserStoryCriteriaNode, 
  UserStoryImplementationContainerNode,
  UserStoryImplementationNode, 
  UserStoryDocNode,
  ImplementationParagraphNode,
  CustomBulletList
}
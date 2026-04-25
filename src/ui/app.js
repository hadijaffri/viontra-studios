// App bootstrap — wires every module together.

import { bus } from "../core/bus.js";
import { registry } from "../core/registry.js";
import { AICore } from "../core/ai-core.js";

import { coderRole }       from "../roles/coder.js";
import { designerRole }    from "../roles/designer.js";
import { gameRole }        from "../roles/game.js";
import { voiceRole }       from "../roles/voice.js";
import { thinkingRole }    from "../roles/thinking.js";
import { testerRole }      from "../roles/tester.js";
import { logoDesignRole }  from "../roles/logo-design.js";
import { frontendRole }    from "../roles/frontend.js";
import { knowledgeRole }   from "../roles/knowledge.js";
import { composerRole }    from "../roles/composer.js";
import { localLLMRole }    from "../roles/local-llm.js";
import { claudeRole }      from "../roles/claude.js";

import { composer }     from "../modules/composer/composer.js";
import { allTemplates } from "../modules/composer/templates/index.js";

import { knowledgeBase }       from "../modules/knowledge/knowledge.js";
import { javascriptArticle }   from "../modules/knowledge/articles/javascript.js";
import { htmlArticle }         from "../modules/knowledge/articles/html.js";
import { pythonArticle }       from "../modules/knowledge/articles/python.js";
import { sqlArticle }          from "../modules/knowledge/articles/sql.js";
import { javaArticle }         from "../modules/knowledge/articles/java.js";
import { typescriptArticle }   from "../modules/knowledge/articles/typescript.js";
import { csharpArticle }       from "../modules/knowledge/articles/csharp.js";
import { cppArticle }          from "../modules/knowledge/articles/cpp.js";
import { phpArticle }          from "../modules/knowledge/articles/php.js";
import { goArticle }           from "../modules/knowledge/articles/go.js";
import { swiftArticle }        from "../modules/knowledge/articles/swift.js";
import { luaArticle }          from "../modules/knowledge/articles/lua.js";
import { luauArticle }         from "../modules/knowledge/articles/luau.js";
import { shellCommandsArticle } from "../modules/knowledge/articles/shell-commands.js";
import { rustArticle }         from "../modules/knowledge/articles/rust.js";
import { scratchArticle }      from "../modules/knowledge/articles/scratch.js";
import { lispArticle }         from "../modules/knowledge/articles/lisp.js";
import { visualBasicArticle }  from "../modules/knowledge/articles/visual-basic.js";
import { fortranArticle }      from "../modules/knowledge/articles/fortran.js";
import { englishArticle }      from "../modules/knowledge/articles/english.js";
import { codingWisdomArticle }     from "../modules/knowledge/articles/coding-wisdom.js";
import { algorithmsArticle }       from "../modules/knowledge/articles/algorithms.js";
import { webFundamentalsArticle }  from "../modules/knowledge/articles/web-fundamentals.js";
import { systemDesignArticle }     from "../modules/knowledge/articles/system-design.js";
import { securityArticle }         from "../modules/knowledge/articles/security.js";
import { designPatternsArticle }   from "../modules/knowledge/articles/design-patterns.js";
import { uiUxDesignArticle }       from "../modules/knowledge/articles/ui-ux-design.js";
import { business101Article }      from "../modules/knowledge/articles/business-101.js";
import { productDevelopmentArticle } from "../modules/knowledge/articles/product-development.js";
import { aiMlArticle }             from "../modules/knowledge/articles/ai-ml.js";

import { mountTools }     from "./tools.js";
import { mountWorkspace } from "./workspace.js";
import { mountChat }      from "./chat.js";
import { mountStudio }    from "./studio.js";
import { mountSettings }  from "./settings.js";
import { mountTutorial }  from "./tutorial.js";
import { mountPanelToggle } from "./panel-toggle.js";

// 1. Register AI roles — the 6 agent capabilities plus knowledge, composer, local LLM, and two legacy roles.
[
  voiceRole, thinkingRole, coderRole, testerRole, logoDesignRole, frontendRole,
  knowledgeRole, composerRole, localLLMRole, claudeRole, designerRole, gameRole,
].forEach(r => registry.registerRole(r));

// 1b. Load composer templates.
allTemplates.forEach(t => composer.register(t));

// 1a. Load reference articles into the knowledge base.
knowledgeBase.addArticle(javascriptArticle);
knowledgeBase.addArticle(htmlArticle);
knowledgeBase.addArticle(pythonArticle);
knowledgeBase.addArticle(sqlArticle);
knowledgeBase.addArticle(javaArticle);
knowledgeBase.addArticle(typescriptArticle);
knowledgeBase.addArticle(csharpArticle);
knowledgeBase.addArticle(cppArticle);
knowledgeBase.addArticle(phpArticle);
knowledgeBase.addArticle(goArticle);
knowledgeBase.addArticle(swiftArticle);
knowledgeBase.addArticle(luaArticle);
knowledgeBase.addArticle(luauArticle);
knowledgeBase.addArticle(shellCommandsArticle);
knowledgeBase.addArticle(rustArticle);
knowledgeBase.addArticle(scratchArticle);
knowledgeBase.addArticle(lispArticle);
knowledgeBase.addArticle(visualBasicArticle);
knowledgeBase.addArticle(fortranArticle);
knowledgeBase.addArticle(englishArticle);
knowledgeBase.addArticle(codingWisdomArticle);
knowledgeBase.addArticle(algorithmsArticle);
knowledgeBase.addArticle(webFundamentalsArticle);
knowledgeBase.addArticle(systemDesignArticle);
knowledgeBase.addArticle(securityArticle);
knowledgeBase.addArticle(designPatternsArticle);
knowledgeBase.addArticle(uiUxDesignArticle);
knowledgeBase.addArticle(business101Article);
knowledgeBase.addArticle(productDevelopmentArticle);
knowledgeBase.addArticle(aiMlArticle);

// 2. Register built-in tools.
registry.registerTool({
  id: "clear-preview",
  label: "Clear Preview",
  run: () => bus.emit("editor.load", { code: "// cleared\n$root.innerHTML = '';" }),
});

// 3. Boot AI Core.
new AICore();

// 4. Mount UI panels.
mountTools(document.getElementById("tools"));
mountStudio(document.getElementById("studio"));
mountWorkspace(document.getElementById("workspace"));
mountChat(document.getElementById("chat"));
mountSettings(document.getElementById("settings-host"));

// 5. Status line.
const status = document.getElementById("status");
bus.on("status", s => { status.textContent = s; });
bus.emit("status", "ready");

// 6. First-run tutorial (cookie-gated).
mountTutorial();

// 7. Panel close (X) + reopen bar.
mountPanelToggle();

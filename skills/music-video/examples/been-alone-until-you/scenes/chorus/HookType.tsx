import { hookSlot } from "./blocks";
import { HookMirror } from "./HookMirror";
import type { BlockProps } from "./hookParts";
import { HookScatter } from "./HookScatter";
import { HookStack } from "./HookStack";
import { HookWall } from "./HookWall";

const layouts = { stack: HookStack, scatter: HookScatter, wall: HookWall, mirror: HookMirror };

export const HookType = ({ block, look }: BlockProps) => {
  const Layout = layouts[look.theme.layouts[hookSlot(block)]];
  return <Layout block={block} look={look} />;
};

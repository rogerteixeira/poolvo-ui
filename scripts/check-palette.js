#!/usr/bin/env node

/**
 * Palette compliance checker
 * Ensures no rgba() usage and no forbidden Tailwind color classes
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const FORBIDDEN_COLOR_CLASSES = [
  'text-red-', 'text-green-', 'text-blue-', 'text-yellow-', 'text-purple-',
  'text-pink-', 'text-indigo-', 'text-orange-', 'text-gray-', 'text-grey-',
  'text-slate-', 'text-zinc-', 'text-neutral-', 'text-stone-', 'text-amber-',
  'text-lime-', 'text-emerald-', 'text-teal-', 'text-cyan-', 'text-sky-',
  'text-violet-', 'text-fuchsia-', 'text-rose-',
  'bg-red-', 'bg-green-', 'bg-blue-', 'bg-yellow-', 'bg-purple-',
  'bg-pink-', 'bg-indigo-', 'bg-orange-', 'bg-gray-', 'bg-grey-',
  'bg-slate-', 'bg-zinc-', 'bg-neutral-', 'bg-stone-', 'bg-amber-',
  'bg-lime-', 'bg-emerald-', 'bg-teal-', 'bg-cyan-', 'bg-sky-',
  'bg-violet-', 'bg-fuchsia-', 'bg-rose-',
  'border-red-', 'border-green-', 'border-blue-', 'border-yellow-', 'border-purple-',
  'border-pink-', 'border-indigo-', 'border-orange-', 'border-gray-', 'border-grey-',
  'border-slate-', 'border-zinc-', 'border-neutral-', 'border-stone-', 'border-amber-',
  'border-lime-', 'border-emerald-', 'border-teal-', 'border-cyan-', 'border-sky-',
  'border-violet-', 'border-fuchsia-', 'border-rose-',
];

function getAllFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules, dist, and .git
      if (!['node_modules', 'dist', '.git'].includes(file)) {
        getAllFiles(filePath, fileList);
      }
    } else {
      const ext = extname(file);
      if (['.ts', '.tsx', '.js', '.jsx', '.css'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  }
  
  return fileList;
}

function checkFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const issues = [];
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    
    // Check for rgba(
    if (/rgba\s*\(/i.test(line)) {
      issues.push({
        file: filePath.replace(rootDir + '/', ''),
        line: lineNum,
        issue: 'rgba() usage found',
        content: line.trim(),
      });
    }
    
    // Check for forbidden Tailwind color classes
    FORBIDDEN_COLOR_CLASSES.forEach((forbidden) => {
      const regex = new RegExp(`['"\`]${forbidden.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
      if (regex.test(line)) {
        issues.push({
          file: filePath.replace(rootDir + '/', ''),
          line: lineNum,
          issue: `Forbidden Tailwind color class: ${forbidden}`,
          content: line.trim(),
        });
      }
    });
  });
  
  return issues;
}

function main() {
  console.log('🔍 Checking palette compliance...\n');
  
  const srcDir = join(rootDir, 'src');
  const files = getAllFiles(srcDir);
  const allIssues = [];
  
  files.forEach((file) => {
    const issues = checkFile(file);
    allIssues.push(...issues);
  });
  
  if (allIssues.length > 0) {
    console.error('❌ Palette violations found:\n');
    allIssues.forEach((issue) => {
      console.error(`  ${issue.file}:${issue.line}`);
      console.error(`    ${issue.issue}`);
      console.error(`    ${issue.content}\n`);
    });
    process.exit(1);
  } else {
    console.log('✅ No palette violations found.');
    process.exit(0);
  }
}

main();


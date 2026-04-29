package com.example.examplemod;

import net.minecraft.world.item.CreativeModeTab;
import net.minecraft.world.item.ItemStack;
import net.minecraftforge.event.CreativeModeTabEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;

@Mod.EventBusSubscriber(modid = ExampleMod.MOD_ID, bus = Mod.EventBusSubscriber.Bus.MOD)
public class ModCreativeModeTabs {
    public static CreativeModeTab EXAMPLE_TAB;

    @SubscribeEvent
    public static void registerCreativeModeTabs(CreativeModeTabEvent.Register event) {
        EXAMPLE_TAB = event.registerCreativeModeTab(ExampleMod.MOD_ID, builder ->
                builder.icon(() -> new ItemStack(ModItems.RUBY.get()))
                        .title(net.minecraft.network.chat.Component.translatable("itemGroup.examplemod"))
        );
    }
}